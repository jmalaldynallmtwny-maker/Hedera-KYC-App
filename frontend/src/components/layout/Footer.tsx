// frontend/src/components/layout/Footer.tsx
import React from 'react';
import { BANKS } from '@/constants/banks';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* البنوك المشاركة */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Participating Banks</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {BANKS.map((bank) => (
              <div 
                key={bank.id}
                className="text-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2"
                  style={{ backgroundColor: bank.theme.primary }}
                >
                  {bank.name.charAt(0)}
                </div>
                <div className="text-sm font-medium">{bank.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* المعلومات */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About KYC Platform</h4>
            <p className="text-gray-400 text-sm">
              Multi-bank KYC verification platform using blockchain technology for privacy-preserving identity verification.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Technology</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>🔒 Hedera Blockchain</li>
              <li>🤖 AI-Powered Verification</li>
              <li>🔐 Military-Grade Encryption</li>
              <li>🏦 Multi-Bank Consensus</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>📧 support@kyc-platform.com</li>
              <li>📞 +222 1234 5678</li>
              <li>🕒 24/7 Customer Service</li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Interactive KYC Platform. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with ❤️ for secure digital identity verification
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
