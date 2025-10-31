import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useKYC } from '@/hooks/useKYC';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusResponse } from '@/types';
import { formatRelativeTime } from '@/lib/cryptoClient';

const KycWait: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getRequestStatus } = useKYC();
  
  const requestId = location.state?.requestId;
  const statusToken = location.state?.statusToken;
  
  const [statusData, setStatusData] = useState<StatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchStatus = async () => {
      if (!requestId) {
        navigate('/');
        return;
      }

      try {
        const result = await getRequestStatus(requestId);
        setStatusData(result);
        setLastUpdated(new Date());
        
        // If request is finalized, stop polling
        if (result.status === 'APPROVED' || result.status === 'REJECTED') {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Failed to fetch status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchStatus();

    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchStatus, 10000);

    return () => clearInterval(intervalId);
  }, [requestId, getRequestStatus, navigate]);

  const getStatusMessage = () => {
    if (!statusData) return 'Loading...';
    
    const { status, counts } = statusData;
    
    switch (status) {
      case 'APPROVED':
        return {
          title: '🎉 KYC Approved!',
          message: 'Congratulations! Your KYC has been approved by all 5 banks.',
          color: 'text-green-600'
        };
      case 'REJECTED':
        return {
          title: '❌ KYC Rejected',
          message: 'Your KYC application was not approved.',
          color: 'text-red-600'
        };
      default:
        return {
          title: '⏳ Under Review',
          message: `Your KYC is being reviewed by banks. ${counts.approved}/5 banks have approved so far.`,
          color: 'text-yellow-600'
        };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 border-green-200 text-green-800';
      case 'REJECTED': return 'bg-red-100 border-red-200 text-red-800';
      default: return 'bg-yellow-100 border-yellow-200 text-yellow-800';
    }
  };

  const statusMessage = getStatusMessage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading KYC Status</h2>
          <p className="text-gray-600">Please wait while we retrieve your application status...</p>
        </Card>
      </div>
    );
  }

  if (!statusData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Status Unavailable</h2>
          <p className="text-gray-600 mb-6">Unable to load KYC request status.</p>
          <Button onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  const { status, counts, votes } = statusData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Status Card */}
        <Card className="text-center mb-6 animate-fade-in">
          <div className="mb-6">
            <div className="text-6xl mb-4">
              {status === 'APPROVED' ? '🎉' : status === 'REJECTED' ? '❌' : '⏳'}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${statusMessage.color}`}>
              {statusMessage.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              {statusMessage.message}
            </p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(status)}`}>
              Status: {status}
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Bank Approvals</span>
              <span>{counts.approved} of 5 Required</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(counts.approved / 5) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Counts Display */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{counts.approved}</div>
              <div className="text-sm text-green-800">Approved</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
              <div className="text-sm text-yellow-800">Pending</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{counts.rejected}</div>
              <div className="text-sm text-red-800">Rejected</div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-gray-500">
            Last updated: {formatRelativeTime(lastUpdated)}
          </div>
        </Card>

        {/* Bank Votes Timeline */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bank Decisions</h2>
          <div className="space-y-3">
            {['baybank', 'oasisbank', 'zenbank', 'arcbank', 'nexbank'].map((bank) => {
              const bankVote = votes.find(v => v.bankId === bank);
              return (
                <div key={bank} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      bankVote?.vote === 'APPROVE' ? 'bg-green-500' : 
                      bankVote?.vote === 'REJECT' ? 'bg-red-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">
                        {bank}
                      </div>
                      <div className="text-sm text-gray-500">
                        {bankVote ? formatRelativeTime(bankVote.createdAt) : 'Waiting for review...'}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bankVote?.vote === 'APPROVE' 
                      ? 'bg-green-100 text-green-800' 
                      : bankVote?.vote === 'REJECT'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {bankVote?.vote || 'PENDING'}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-3">
            {statusToken && (
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/status/${statusToken}`);
                  // Show copied notification
                  alert('Status link copied to clipboard!');
                }}
                variant="outline"
                className="flex-1"
              >
                📋 Copy Status Link
              </Button>
            )}
            
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1"
            >
              🏠 Return Home
            </Button>

            {(status === 'APPROVED' || status === 'REJECTED') && (
              <Button 
                onClick={() => navigate(`/bank/${bankId}/app`)}
                className="flex-1"
              >
                {status === 'APPROVED' ? '🎉 Open Bank Account' : '🔄 Try Again'}
              </Button>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="mt-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">How it works</h4>
              <p className="text-sm text-gray-600">
                Your KYC application is reviewed simultaneously by 5 banks. 
                All banks must approve for your application to be accepted. 
                You can check this status page anytime using the copied link.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KycWait;
