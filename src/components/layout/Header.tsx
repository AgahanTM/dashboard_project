import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-dark-200 shadow-sm py-3 px-4 flex items-center justify-between sticky top-0 z-20"
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 lg:hidden"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon size={20} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors relative">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
          <div className="mr-3 text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};