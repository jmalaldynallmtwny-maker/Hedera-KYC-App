import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import App from './App.tsx'
import { AppProvider } from '@/context/AppContext'

import './styles/tailwind.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
          <Toaster 
            position="top-right"
            duration={4000}
            expand={true}
            closeButton
            richColors
            theme="light"
          />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
