import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { FaceModelLoader } from '@/components/FaceModelLoader'

// Layout Components
import { MainLayout } from '@/components/layout/MainLayout'
import { BankLayout } from '@/components/layout/BankLayout'

// Page Components
import Landing from '@/pages/Landing'
import Register from '@/pages/Register'
import Status from '@/pages/Status'
import BankLogin from '@/pages/BankLogin'
import KycStart from '@/pages/KycStart'
import KycWait from '@/pages/KycWait'
import AdminLogin from '@/pages/AdminLogin'
import AdminDashboard from '@/pages/AdminDashboard'
import AdminEnrollFace from '@/pages/AdminEnrollFace'
import ReviewPage from '@/pages/ReviewPage'
import NL2SQLPlayground from '@/pages/NL2SQLPlayground'

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading Interactive KYC Platform...</p>
    </div>
  </div>
)

function App() {
  const { state } = useApp()

  if (state.isLoading) {
    return <LoadingSpinner />
  }

  return (
    <FaceModelLoader>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="status/:token" element={<Status />} />
          <Route path="admin-enroll-face" element={<AdminEnrollFace />} />
          <Route path="review/:requestId" element={<ReviewPage />} />
          <Route path="nl2sql" element={<NL2SQLPlayground />} />
        </Route>

        {/* Bank User Routes */}
        <Route path="/bank/:bankId" element={<BankLayout />}>
          <Route path="login" element={<BankLogin />} />
          <Route path="kyc-start" element={<KycStart />} />
          <Route path="kyc-wait" element={<KycWait />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/:bankId" element={<BankLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FaceModelLoader>
  )
}

export default App
