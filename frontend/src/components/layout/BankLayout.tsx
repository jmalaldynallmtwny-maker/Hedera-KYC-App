// frontend/src/components/layout/BankLayout.tsx
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getBankTheme } from '@/constants/banks';

export const BankLayout: React.FC = () => {
  const { bankId } = useParams();
  const theme = getBankTheme(bankId || 'baybank');

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.accent}20 100%)` 
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
            style={{ backgroundColor: theme.primary }}
          >
            {bankId?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold" style={{ color: theme.primary }}>
            {bankId ? `${bankId.charAt(0).toUpperCase() + bankId.slice(1)}` : 'Bank'} Portal
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
