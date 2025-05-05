import React, { createContext, useContext, useState } from 'react';
import { authApi, UserData } from '../utils/api';
import toast from 'react-hot-toast';

interface UserInputData {
  displayName: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'staff';
  department?: string;
  position?: string;
  phoneNumber?: string;
  userId?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  createNewUser: (userData: UserInputData) => Promise<UserData>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Sign in
  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const response = await authApi.login(email, password);
      setUser(response.user);
      setToken(response.token);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign in';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = () => {
    setUser(null);
    setError(null);
    setToken(null);
  };

  // Create a new user
  const createNewUser = async (userData: UserInputData) => {
    setError(null);
    try {
      if (!user || user.role !== 'admin') {
        throw new Error('Only administrators can create new users');
      }
      
      console.log('Creating new user with data:', {...userData, password: '****'});
      
      const response = await authApi.register(userData);
      
      console.log('User creation successful:', response);
      return response.data;
    } catch (error: any) {
      console.error('User creation error:', error);
      
      // Show the error message from the server
      let errorMessage = error.message || 'Failed to create user';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  };

  // Logout function
  const logoutUser = () => {
    // Clear user data and token from state
    setUser(null);
    setToken(null);
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Use the authApi.logout function
    authApi.logout();
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
    createNewUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 