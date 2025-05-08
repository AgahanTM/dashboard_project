import React from 'react';
import { motion } from 'framer-motion';
import { SettingsForm } from '../components/settings/SettingsForm';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences.
        </p>
      </motion.div>
      
      <SettingsForm />
    </div>
  );
};