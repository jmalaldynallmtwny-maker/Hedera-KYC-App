import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BANKS } from '@/constants/banks';
import { useApp } from '@/context/AppContext';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useApp();
  const [showBankSelection, setShowBankSelection] = useState(false);

  const handleUserEntry = () => {
    navigate('/register');
  };

  const handleAdminLogin = (bankId: string) => {
    navigate(`/admin/${bankId}/login`);
    addNotification({
      type: 'info',
      title: 'Admin Login',
      message: `Redirecting to ${BANKS.find(b => b.id === bankId)?.name} admin login`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Interactive <span className="text-gradient">KYC</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            One KYC request — reviewed by five banks. Privacy-first proof on Hedera.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={handleUserEntry}
              className="btn-primary transform hover:scale-105 transition-transform"
            >
              🚀 Enter as User
            </button>
            <button 
              onClick={() => setShowBankSelection(!showBankSelection)}
              className="btn-secondary transform hover:scale-105 transition-transform"
            >
              🔐 Admin Login
            </button>
          </div>

          {/* Bank Selection Modal */}
          {showBankSelection && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-slide-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Your Bank</h3>
                <p className="text-gray-600 mb-6">Choose your bank to access the admin dashboard</p>
                
                <div className="space-y-3">
                  {BANKS.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => handleAdminLogin(bank.id)}
                      className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center gap-4"
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: bank.theme.primary }}
                      >
                        {bank.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{bank.name}</div>
                        <div className="text-sm text-gray-500">Admin Dashboard</div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowBankSelection(false)}
                  className="w-full mt-4 p-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Bank</h3>
              <p className="text-gray-600">Single KYC request reviewed simultaneously by 5 banks</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy-First</h3>
              <p className="text-gray-600">Zero-knowledge proofs on Hedera blockchain</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-gray-600">AI-powered verification with military-grade encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Leading Banks</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {BANKS.map((bank) => (
              <div key={bank.id} className="flex items-center justify-center p-4">
                <div 
                  className="text-2xl font-bold p-4 rounded-lg w-full text-center text-white"
                  style={{ backgroundColor: bank.theme.primary }}
                >
                  {bank.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
