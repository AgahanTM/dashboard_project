import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, LogIn } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Toggle } from '../components/ui/Toggle';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup, error } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    let success;
    if (isLogin) {
      success = await login(formState.email, formState.password);
    } else {
      success = await signup(formState.name, formState.email, formState.password);
    }
    
    setIsLoading(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-300 p-4">
      <div className="absolute top-4 right-4">
        <Toggle
          isOn={theme === 'dark'}
          onToggle={toggleTheme}
          label="Dark Mode"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-dark-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4"
              >
                <LogIn size={28} />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {isLogin
                  ? 'Sign in to access your dashboard'
                  : 'Sign up to get started with your account'}
              </p>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {!isLogin && (
                  <Input
                    label="Full Name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    icon={<User size={18} />}
                    required
                  />
                )}
                
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  icon={<Mail size={18} />}
                  required
                />
                
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  icon={<Lock size={18} />}
                  required
                />
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}
                
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  icon={<ArrowRight size={18} />}
                >
                  {isLoading
                    ? isLogin ? 'Signing in...' : 'Creating account...'
                    : isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </motion.form>
            </AnimatePresence>
            
            <div className="mt-6 text-center">
              <button
                onClick={toggleForm}
                className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};