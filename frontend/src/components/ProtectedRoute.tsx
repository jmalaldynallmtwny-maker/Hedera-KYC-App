import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireBank?: string;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Ensures authentication and authorization before rendering children
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  requireBank,
  redirectTo = '/',
}) => {
  const { state } = useApp();
  const location = useLocation();

  // Show loading state while checking auth
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!state.isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if admin is required
  if (requireAdmin && !state.admin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if specific bank is required
  if (requireBank && state.bank?.id !== requireBank) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // All checks passed, render children
  return <>{children}</>;
};

/**
 * Admin Only Route
 * Shorthand for ProtectedRoute with requireAdmin=true
 */
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProtectedRoute requireAdmin={true}>{children}</ProtectedRoute>;
};

/**
 * Bank Specific Route
 * Ensures user is authenticated and belongs to specific bank
 */
export const BankRoute: React.FC<{ children: React.ReactNode; bankId: string }> = ({
  children,
  bankId,
}) => {
  return <ProtectedRoute requireBank={bankId}>{children}</ProtectedRoute>;
};







