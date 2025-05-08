import React from 'react';
import { motion } from 'framer-motion';
import { UserTable } from '../components/users/UserTable';
import { mockUsers } from '../data/mockData';

export const Users: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Users
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage and monitor user accounts.
        </p>
      </motion.div>
      
      <UserTable users={mockUsers} />
    </div>
  );
};