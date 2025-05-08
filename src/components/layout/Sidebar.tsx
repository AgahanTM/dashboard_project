import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { title: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { title: 'Users', path: '/users', icon: <Users size={20} /> },
    { title: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const sidebarVariants = {
    open: { 
      width: isMobile ? '100%' : '240px',
      transition: { duration: 0.3 }
    },
    closed: { 
      width: isMobile ? '0' : '80px',
      transition: { duration: 0.3 }
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AnimatePresence>
      {(isOpen || !isMobile) && (
        <motion.aside
          initial={isMobile ? 'closed' : 'open'}
          animate={isOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          className={`fixed top-0 left-0 h-full bg-white dark:bg-dark-300 shadow-md z-30 overflow-hidden ${isMobile ? 'w-full' : ''}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                {isOpen && (
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-primary-600 dark:text-primary-400"
                  >
                    Dashboard
                  </motion.h1>
                )}
              </motion.div>
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-100 transition-colors"
              >
                {isMobile ? (
                  <X size={20} className="text-gray-600 dark:text-gray-300" />
                ) : isOpen ? (
                  <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
            
            <nav className="flex-1 py-4 overflow-y-auto">
              <ul className="space-y-1 px-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100'
                        }
                      `}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {isOpen && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100 rounded-lg transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                {isOpen && <span className="font-medium">Logout</span>}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};