import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useKYC } from '@/hooks/useKYC';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusResponse } from '@/types';
import { formatDate, formatRelativeTime } from '@/lib/cryptoClient';

const Status: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { getRequestStatus } = useKYC();
  
  const [statusData, setStatusData] = useState<StatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      if (!token) {
        setError('Invalid status token');
        setIsLoading(false);
        return;
      }

      try {
        // In a real implementation, this would decrypt the token and get requestId
        // For demo, we'll use a mock implementation
        const result = await getRequestStatus(token);
        setStatusData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to load status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [token, getRequestStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-100 border-green-200';
      case 'REJECTED': return 'text-red-600 bg-red-100 border-red-200';
      case 'EXPIRED': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return '✅';
      case 'REJECTED': return '❌';
      case 'EXPIRED': return '⏰';
      default: return '⏳';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading KYC status...</p>
        </Card>
      </div>
    );
  }

  if (error || !statusData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Status Unavailable</h2>
          <p className="text-gray-600 mb-6">
            {error || 'Unable to load KYC request status. The link may have expired.'}
          </p>
          <Button onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  const { status, counts, votes, createdAt, votingDeadline, payloadSummary } = statusData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{getStatusIcon(status)}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Request Status</h1>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold border-2 ${getStatusColor(status)}`}>
              Status: {status}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Banks Approved</span>
              <span>{counts.approved} of 5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(counts.approved / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Counts Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{counts.approved}</div>
              <div className="text-sm text-blue-800">Approved</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
              <div className="text-sm text-yellow-800">Pending</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{counts.rejected}</div>
              <div className="text-sm text-red-800">Rejected</div>
            </div>
          </div>
        </Card>

        {/* Voting Timeline */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bank Votes</h2>
          <div className="space-y-3">
            {votes.length > 0 ? (
              votes.map((vote, index) => (
                <div key={vote.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      vote.vote === 'APPROVE' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {vote.admin?.username || `Bank ${vote.bankId}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatRelativeTime(vote.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    vote.vote === 'APPROVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vote.vote}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No votes have been cast yet
              </div>
            )}
          </div>
        </Card>

        {/* Request Details */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Request Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Submitted:</span>
              <span className="font-medium">{formatDate(createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Voting Deadline:</span>
              <span className="font-medium">{formatDate(votingDeadline)}</span>
            </div>
            {payloadSummary && (
              <div className="flex justify-between">
                <span className="text-gray-600">Occupation:</span>
                <span className="font-medium">{payloadSummary.occupation}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              variant="outline"
              className="flex-1"
            >
              📋 Copy Status Link
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="flex-1"
            >
              🏠 Return Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Status;
