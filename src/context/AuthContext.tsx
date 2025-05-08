import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation
      if (!email || !password) {
        setError('Please enter both email and password');
        return false;
      }
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser) {
        // In a real app, we would verify the password here
        setUser(foundUser);
        setIsAuthenticated(true);
        setError(null);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return false;
      }
      
      // Check if user already exists
      const userExists = mockUsers.some(u => u.email === email);
      
      if (userExists) {
        setError('User with this email already exists');
        return false;
      }
      
      // Create new user (in a real app, this would be saved to a database)
      const newUser = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        role: 'User',
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      setError(null);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (err) {
      setError('An error occurred during signup');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};