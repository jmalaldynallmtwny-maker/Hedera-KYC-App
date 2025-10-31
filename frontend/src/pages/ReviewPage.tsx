import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useKYC } from '@/hooks/useKYC';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { KYCRequest } from '@/types';
import { formatDate, formatRelativeTime } from '@/lib/cryptoClient';

const ReviewPage: React.FC = () => {
  const { bankId, requestId } = useParams<{ bankId: string; requestId: string }>();
  const navigate = useNavigate();
  const { getRequestDetails, submitVote } = useKYC();
  const { addNotification } = useApp();

  const [request, setRequest] = useState<KYCRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [voteReason, setVoteReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectInput, setShowRejectInput] = useState(false);

  useEffect(() => {
    fetchRequestDetails();
  }, [requestId, bankId]);

  const fetchRequestDetails = async () => {
    try {
      // في التطبيق الحقيقي، هذا سيكون استدعاء API
      // للآن، سنستخدم بيانات وهمية للعرض
      const mockRequest: KYCRequest = {
        id: requestId!,
        citizen_ref: 'citizen_123',
        masked_nni: '2001****56',
        payload_summary: {
          occupation: 'Software Engineer',
          employer_name: 'Tech Company',
          source_of_funds: 'Salary',
          estimated_monthly_income: '100,000 - 200,000 MRU',
          account_purpose: 'Personal Savings',
          is_pep: false,
          consent: true
        },
        status: 'PENDING',
        voting_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        votes: [
          {
            id: 'vote1',
            requestId: requestId!,
            bankId: 'baybank',
            adminId: 'admin1',
            vote: 'APPROVE',
            createdAt: new Date().toISOString(),
            admin: { username: 'baybank_admin' }
          }
        ],
        voteSummary: {
          total: 1,
          approved: 1,
          rejected: 0,
          pending: 4
        }
      };
      
      setRequest(mockRequest);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Failed to load request',
        message: 'Could not retrieve KYC request details'
      });
      navigate(`/admin/${bankId}/dashboard`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (vote: 'APPROVE' | 'REJECT') => {
    if (vote === 'REJECT' && !voteReason.trim()) {
      addNotification({
        type: 'error',
        title: 'Reason Required',
        message: 'Please provide a reason for rejection'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitVote(requestId!, {
        vote,
        reason: vote === 'REJECT' ? voteReason : undefined
      });

      addNotification({
        type: 'success',
        title: `Vote ${vote === 'APPROVE' ? 'Approved' : 'Rejected'}`,
        message: 'Your vote has been recorded successfully'
      });

      navigate(`/admin/${bankId}/dashboard`);
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Vote Failed',
        message: error.message || 'Failed to submit vote'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Request</h2>
          <p className="text-gray-600">Please wait...</p>
        </Card>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Not Found</h2>
          <p className="text-gray-600 mb-6">The requested KYC application could not be found.</p>
          <Button onClick={() => navigate(`/admin/${bankId}/dashboard`)}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const { payload_summary, votes, voteSummary, created_at } = request;
  const hasVoted = votes.some(v => v.bankId === bankId);
  const isFinalized = request.status !== 'PENDING';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Review KYC Application</h1>
              <div className="flex items-center space-x-4">
                <StatusBadge status={request.status} size="lg" />
                <span className="text-gray-600">NNI: {request.masked_nni}</span>
                <span className="text-gray-600">Submitted: {formatRelativeTime(created_at)}</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/${bankId}/dashboard`)}
            >
              ← Back to Dashboard
            </Button>
          </div>

          {/* Vote Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{voteSummary?.approved || 0}</div>
              <div className="text-sm text-blue-800">Approved</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{voteSummary?.rejected || 0}</div>
              <div className="text-sm text-red-800">Rejected</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{voteSummary?.pending || 0}</div>
              <div className="text-sm text-yellow-800">Pending</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">{votes.length}/5</div>
              <div className="text-sm text-gray-800">Total Votes</div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Applicant Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">NNI</label>
                  <p className="mt-1 text-sm text-gray-900">{request.masked_nni}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Occupation</label>
                  <p className="mt-1 text-sm text-gray-900">{payload_summary?.occupation}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source of Funds</label>
                  <p className="mt-1 text-sm text-gray-900">{payload_summary?.source_of_funds}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Income</label>
                  <p className="mt-1 text-sm text-gray-900">{payload_summary?.estimated_monthly_income}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Account Purpose</label>
                  <p className="mt-1 text-sm text-gray-900">{payload_summary?.account_purpose}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">PEP Status</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {payload_summary?.is_pep ? 'Yes - Politically Exposed Person' : 'No'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Bank Votes */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bank Decisions</h2>
              <div className="space-y-3">
                {votes.map((vote) => (
                  <div key={vote.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        vote.vote === 'APPROVE' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="font-semibold text-gray-900 capitalize">
                          {vote.bankId}
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
                      {vote.vote} {vote.reason && `- ${vote.reason}`}
                    </div>
                  </div>
                ))}
                {votes.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No votes cast yet</p>
                )}
              </div>
            </Card>
          </div>

          {/* Voting Panel */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Decision</h2>
              
              {hasVoted ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-gray-600">You have already voted on this request</p>
                </div>
              ) : isFinalized ? (
                <div className="text-center py-6">
                  <p className="text-gray-600">This request has been finalized</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    onClick={() => handleVote('APPROVE')}
                    loading={isSubmitting}
                    disabled={showRejectInput}
                    className="w-full"
                  >
                    ✅ Approve Application
                  </Button>

                  {!showRejectInput ? (
                    <Button
                      variant="outline"
                      onClick={() => setShowRejectInput(true)}
                      className="w-full"
                    >
                      ❌ Reject Application
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        value={voteReason}
                        onChange={(e) => setVoteReason(e.target.value)}
                        placeholder="Provide a clear reason for rejection..."
                        className="input-field h-24 resize-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowRejectInput(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleVote('REJECT')}
                          loading={isSubmitting}
                          disabled={!voteReason.trim()}
                          className="flex-1"
                        >
                          Confirm Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Voting Guidelines */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">📋 Voting Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Approve if all information is valid</li>
                  <li>• Reject if documents are suspicious</li>
                  <li>• Provide clear reason for rejection</li>
                  <li>• One rejection cancels the request</li>
                </ul>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigator.clipboard.writeText(request.id)}
                >
                  📋 Copy Request ID
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.print()}
                >
                  🖨️ Print Review
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
