import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Bank, Citizen, Admin, KYCRequest } from '@/types';
import { getBankById } from '@/constants/banks';
import { api } from '@/lib/api';

interface AppState {
  user: Citizen | null;
  admin: Admin | null;
  bank: Bank | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentRoute: string;
  notifications: Notification[];
  pendingRequests: KYCRequest[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: Citizen | null }
  | { type: 'SET_ADMIN'; payload: Admin | null }
  | { type: 'SET_BANK'; payload: Bank | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_CURRENT_ROUTE'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_PENDING_REQUESTS'; payload: KYCRequest[] }
  | { type: 'LOGIN_USER'; payload: { user: Citizen; bank: Bank } }
  | { type: 'LOGIN_ADMIN'; payload: { admin: Admin; bank: Bank } }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  user: null,
  admin: null,
  bank: null,
  isAuthenticated: false,
  isLoading: true,
  currentRoute: '/',
  notifications: [],
  pendingRequests: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ADMIN':
      return { ...state, admin: action.payload };
    case 'SET_BANK':
      return { ...state, bank: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_CURRENT_ROUTE':
      return { ...state, currentRoute: action.payload };
    case 'ADD_NOTIFICATION':
      const newNotification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      };
      return {
        ...state,
        notifications: [...state.notifications, newNotification].slice(-5), // Keep last 5
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    case 'SET_PENDING_REQUESTS':
      return { ...state, pendingRequests: action.payload };
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload.user,
        bank: action.payload.bank,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_ADMIN':
      return {
        ...state,
        admin: action.payload.admin,
        bank: action.payload.bank,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        admin: null,
        bank: null,
        isAuthenticated: false,
        isLoading: false,
        notifications: [],
        pendingRequests: [],
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  loginUser: (user: Citizen, bank: Bank) => void;
  loginAdmin: (admin: Admin, bank: Bank) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setCurrentRoute: (route: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  setPendingRequests: (requests: KYCRequest[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verify session with backend (uses httpOnly cookies)
        const response = await api.get('/api/auth/verify');
        
        if (response.data && response.data.admin && response.data.bank) {
          const { admin, bank: bankData } = response.data;
          const bank = getBankById(bankData.id) || bankData;
          
          dispatch({ type: 'LOGIN_ADMIN', payload: { admin, bank } });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Auth check failed:', message);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const loginUser = (user: Citizen, bank: Bank) => {
    // No localStorage - authentication uses httpOnly cookies
    dispatch({ type: 'LOGIN_USER', payload: { user, bank } });
    addNotification({
      type: 'success',
      title: 'Welcome!',
      message: `Successfully logged in to ${bank.name}`,
    });
  };

  const loginAdmin = (admin: Admin, bank: Bank) => {
    // No localStorage - authentication uses httpOnly cookies
    dispatch({ type: 'LOGIN_ADMIN', payload: { admin, bank } });
    addNotification({
      type: 'success',
      title: 'Welcome, Admin!',
      message: `Successfully logged in to ${bank.name} admin panel`,
    });
  };

  const logout = async () => {
    try {
      // Call logout API to clear httpOnly cookies
      if (state.bank?.id) {
        await api.post(`/api/auth/${state.bank.id}/logout`);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Logout API error:', message);
    } finally {
      // Always clear local state
      dispatch({ type: 'LOGOUT' });
      addNotification({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been successfully logged out',
      });
    }
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setCurrentRoute = (route: string) => {
    dispatch({ type: 'SET_CURRENT_ROUTE', payload: route });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const setPendingRequests = (requests: KYCRequest[]) => {
    dispatch({ type: 'SET_PENDING_REQUESTS', payload: requests });
  };

  const value: AppContextType = {
    state,
    dispatch,
    loginUser,
    loginAdmin,
    logout,
    setLoading,
    setCurrentRoute,
    addNotification,
    removeNotification,
    setPendingRequests,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
