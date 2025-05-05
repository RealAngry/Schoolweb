import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription, AlertIcon } from '../components/ui/alert';
import { AlertCircle, AlertTriangle, Server } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const { signIn, error } = useAuth();
  const navigate = useNavigate();
  
  // Clear errors when inputs change
  useEffect(() => {
    setAuthError(null);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setConnectionError(null);
    setAuthError(null);
    
    try {
      await signIn(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      // Handle connection errors separately
      if (error.message && error.message.includes('Cannot connect to server')) {
        setConnectionError(error.message);
        toast.error('Server connection error');
      } else if (error.message && error.message.includes('Invalid email or password')) {
        setAuthError(error.message);
        toast.error('Authentication failed');
      } else {
        // Other errors are handled in AuthContext
        toast.error('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Login</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to access the dashboard
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        {connectionError && (
          <Alert variant="destructive" className="mb-4">
            <div className="flex items-center">
              <Server className="h-4 w-4 mr-2" />
              <AlertDescription>
                {connectionError}
                <div className="mt-2 text-sm">
                  Please make sure the server is running at http://localhost:5000
                </div>
              </AlertDescription>
            </div>
          </Alert>
        )}

        {authError && (
          <Alert variant="destructive" className="mb-4">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>
                {authError}
                <div className="mt-2 text-sm">
                  Please verify your credentials and try again.
                </div>
              </AlertDescription>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full ${authError ? 'border-red-300 focus-visible:ring-red-400' : ''}`}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full ${authError ? 'border-red-300 focus-visible:ring-red-400' : ''}`}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              <p className="font-medium">Demo Account:</p>
              <p>Email: admin@hmps.edu</p>
              <p>Password: admin123</p>
              <p className="mt-2 italic">Using simplified authentication with native fetch API</p>
              <p className="font-semibold text-red-500 mt-2">
                Currently experiencing authentication issues. Please try again later.
              </p>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPage;