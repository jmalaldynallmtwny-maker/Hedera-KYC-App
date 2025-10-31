import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { llmApi } from '@/lib/api';
import { useApp } from '@/context/AppContext';

interface LLMResponse {
  action: 'RESULTS' | 'NAVIGATE' | 'CONFIRM' | 'ERROR';
  confidence: number;
  sql?: string;
  params?: any[];
  target?: string;
  message?: string;
  data?: any;
}

const NL2SQLPlayground: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const { addNotification } = useApp();

  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<LLMResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ query: string; response: LLMResponse }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      addNotification({
        type: 'error',
        title: 'Empty Query',
        message: 'Please enter a natural language query'
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await llmApi.query({
        mode: 'nl2sql',
        text: query,
        context: { bankId }
      });

      setResponse(result.data);
      setHistory(prev => [{ query, response: result.data }, ...prev.slice(0, 9)]); // Keep last 10
      
      addNotification({
        type: 'success',
        title: 'Query Executed',
        message: `Confidence: ${(result.data.confidence * 100).toFixed(1)}%`
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Query Failed',
        message: error.message || 'Failed to process query'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    "Show me all pending KYC requests",
    "How many KYC requests were approved this week?",
    "Display recent votes by our bank",
    "Show users activated in the last 30 days",
    "What's the approval rate for KYC requests?",
    "List all rejected requests with reasons"
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'RESULTS': return 'bg-green-100 text-green-800';
      case 'NAVIGATE': return 'bg-blue-100 text-blue-800';
      case 'CONFIRM': return 'bg-yellow-100 text-yellow-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NL→SQL Playground</h1>
            <p className="text-gray-600">
              Convert natural language queries to SQL and explore your data
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Natural Language Query
                  </label>
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question about your KYC data..."
                    className="input-field h-32 resize-none"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Processing...' : 'Execute Query'}
                </Button>
              </form>

              {/* Example Queries */}
              <Card>
                <h3 className="font-semibold text-gray-900 mb-3">💡 Example Queries</h3>
                <div className="space-y-2">
                  {exampleQueries.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(example)}
                      className="block w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Query History */}
              {history.length > 0 && (
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-3">📚 Recent Queries</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          setQuery(item.query);
                          setResponse(item.response);
                        }}
                      >
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.query}
                        </div>
                        <div className={`inline-flex items-center px-2 py-1 rounded text-xs mt-1 ${getActionColor(item.response.action)}`}>
                          {item.response.action} ({(item.response.confidence * 100).toFixed(0)}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Response Overview */}
              {response && (
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-3">Query Results</h3>
                  
                  <div className="space-y-4">
                    {/* Action & Confidence */}
                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getActionColor(response.action)}`}>
                        {response.action}
                      </div>
                      <div className="text-sm text-gray-600">
                        Confidence: <strong>{(response.confidence * 100).toFixed(1)}%</strong>
                      </div>
                    </div>

                    {/* Message */}
                    {response.message && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">{response.message}</p>
                      </div>
                    )}

                    {/* SQL Query */}
                    {response.sql && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Generated SQL:</h4>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
                          {response.sql}
                        </pre>
                      </div>
                    )}

                    {/* Parameters */}
                    {response.params && response.params.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Parameters:</h4>
                        <div className="bg-gray-100 p-3 rounded text-sm">
                          {JSON.stringify(response.params, null, 2)}
                        </div>
                      </div>
                    )}

                    {/* Results Data */}
                    {response.data && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Results:</h4>
                        <div className="bg-white border border-gray-200 rounded overflow-hidden">
                          <pre className="p-4 text-sm overflow-x-auto max-h-60">
                            {JSON.stringify(response.data, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Navigation Target */}
                    {response.target && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-800">
                          <strong>Navigation:</strong> {response.target}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Information Card */}
              <Card>
                <h3 className="font-semibold text-gray-900 mb-3">ℹ️ How it Works</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Write questions in natural language (English or Arabic)</p>
                  <p>• AI converts your question to safe SQL queries</p>
                  <p>• Queries are validated for security before execution</p>
                  <p>• Results are limited to prevent overload</p>
                  <p>• Some queries may require confirmation</p>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <h4 className="font-medium text-yellow-800 mb-1">🔒 Security Features</h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• SQL injection protection</li>
                    <li>• Read-only queries only</li>
                    <li>• Row limits enforced</li>
                    <li>• Sensitive data filtering</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NL2SQLPlayground;
