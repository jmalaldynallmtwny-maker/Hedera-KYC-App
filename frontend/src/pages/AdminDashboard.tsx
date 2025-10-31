import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useKYC } from '@/hooks/useKYC';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { KYCRequest, DashboardStats } from '@/types';
import { formatDate, formatRelativeTime } from '@/lib/cryptoClient';
import { getBankTheme } from '@/constants/banks';

const AdminDashboard: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const { getPendingRequests, submitVote } = useKYC();
  const { addNotification, logout } = useApp();
  
  const [requests, setRequests] = useState<KYCRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<KYCRequest | null>(null);
  const [voteReason, setVoteReason] = useState('');

  const bankTheme = getBankTheme(bankId || 'baybank');

  useEffect(() => {
    fetchDashboardData();
  }, [bankId]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const result = await getPendingRequests();
      setRequests(result.requests || []);
      
      // Mock stats - in real app, this would come from API
      setStats({
        pending: result.requests?.length || 0,
        approved: 12,
        rejected: 3,
        totalUsers: 45,
        totalRequests: 60
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Failed to load data',
        message: 'Could not retrieve dashboard information'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (requestId: string, vote: 'APPROVE' | 'REJECT') => {
    if (vote === 'REJECT' && !voteReason.trim()) {
      addNotification({
        type: 'error',
        title: 'Reason Required',
        message: 'Please provide a reason for rejection'
      });
      return;
    }

    try {
      await submitVote(requestId, {
        vote,
        reason: vote === 'REJECT' ? voteReason : undefined
      });

      addNotification({
        type: 'success',
        title: `Vote ${vote === 'APPROVE' ? 'Approved' : 'Rejected'}`,
        message: `Your ${vote.toLowerCase()} vote has been recorded`
      });

      setSelectedRequest(null);
      setVoteReason('');
      fetchDashboardData(); // Refresh data
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Vote Failed',
        message: error.message || 'Failed to submit vote'
      });
    }
  };

  const filteredRequests = requests.filter(request =>
    request.masked_nni?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.payload_summary?.occupation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">Preparing admin interface...</p>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: `linear-gradient(135deg, ${bankTheme.primary}10 0%, ${bankTheme.accent}10 100%)` 
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: bankTheme.primary }}
              >
                {bankId?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {bankId ? `${bankId.charAt(0).toUpperCase() + bankId.slice(1)}` : 'Bank'} Admin
                </h1>
                <p className="text-sm text-gray-500">KYC Review Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                🏠 Home
              </Button>
              <Button
                variant="outline"
                onClick={logout}
              >
                🚪 Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats?.pending || 0}</div>
              <div className="text-sm font-medium text-gray-600">Pending Reviews</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats?.approved || 0}</div>
              <div className="text-sm font-medium text-gray-600">Approved</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats?.rejected || 0}</div>
              <div className="text-sm font-medium text-gray-600">Rejected</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats?.totalUsers || 0}</div>
              <div className="text-sm font-medium text-gray-600">Total Users</div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Input
              placeholder="Search by NNI or occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={fetchDashboardData}>
                🔄 Refresh
              </Button>
            </div>
          </div>
        </Card>

        {/* Requests Table */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pending KYC Requests</h2>
          
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Requests</h3>
              <p className="text-gray-600">All KYC requests have been reviewed.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Occupation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bank Votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.masked_nni}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.payload_summary?.occupation}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.payload_summary?.occupation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatRelativeTime(request.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <span className="text-green-600">✓{request.voteSummary?.approved || 0}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-red-600">✗{request.voteSummary?.rejected || 0}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-yellow-600">⏳{request.voteSummary?.pending || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                          style={{ backgroundColor: bankTheme.primary }}
                        >
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Review KYC Application</h2>
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setVoteReason('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Applicant Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">NNI:</span>{' '}
                    {selectedRequest.masked_nni}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Occupation:</span>{' '}
                    {selectedRequest.payload_summary?.occupation}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Source of Funds:</span>{' '}
                    {selectedRequest.payload_summary?.source_of_funds}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Monthly Income:</span>{' '}
                    {selectedRequest.payload_summary?.estimated_monthly_income}
                  </div>
                </div>
              </div>

              {/* Bank Votes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bank Decisions</h3>
                <div className="space-y-2">
                  {selectedRequest.votes.map((vote) => (
                    <div key={vote.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                      <span className="font-medium capitalize">{vote.bankId}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        vote.vote === 'APPROVE' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vote.vote} {vote.reason && `- ${vote.reason}`}
                      </span>
                    </div>
                  ))}
                  {selectedRequest.votes.length === 0 && (
                    <p className="text-gray-500 text-sm">No votes cast yet</p>
                  )}
                </div>
              </div>

              {/* Rejection Reason Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason (Required if rejecting)
                </label>
                <textarea
                  value={voteReason}
                  onChange={(e) => setVoteReason(e.target.value)}
                  placeholder="Provide a clear reason for rejection..."
                  className="input-field h-20 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedRequest(null);
                    setVoteReason('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleVote(selectedRequest.id, 'APPROVE')}
                  style={{ backgroundColor: '#16A34A' }}
                >
                  ✅ Approve
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleVote(selectedRequest.id, 'REJECT')}
                  style={{ backgroundColor: '#DC2626' }}
                  disabled={!voteReason.trim()}
                >
                  ❌ Reject
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
