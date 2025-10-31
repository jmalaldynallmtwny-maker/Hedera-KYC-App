// Filename: src/components/layout/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const { state, logout } = useApp();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* الشعار */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">KYC</span>
              </div>
              <span>Interactive KYC</span>
            </Link>
          </div>

          {/* التنقل */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {state.isAuthenticated ? (
              <>
                {state.admin ? (
                  // مسؤول
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      👋 Welcome, {state.admin.username}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {state.bank?.name || 'Admin'}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/${state.bank?.id}/dashboard`)}
                      type="button"
                    >
                      Dashboard
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={logout}
                      type="button"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  // مستخدم عادي
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      Welcome, {state.user?.given_name}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/bank/${state.bank?.id}/app`)}
                      type="button"
                    >
                      Bank App
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={logout}
                      type="button"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </>
            ) : (
              // زائر
              <div className="flex items-center space-x-4">
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Start KYC
                </Link>
                <Button
                  size="sm"
                  onClick={() => navigate('/')}
                  type="button"
                >
                  Home
                </Button>
              </div>
            )}
          </nav>

          {/* قائمة الجوال */}
          <div className="md:hidden">
            {/* أضفنا aria-label و title و aria-expanded لتحسين الوصولية */}
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="فتح قائمة التنقل"
              title="فتح القائمة"
              aria-expanded="false"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
