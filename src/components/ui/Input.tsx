import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  name?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  name,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
          className={`w-full px-4 py-2 ${icon ? 'pl-10' : ''} rounded-lg border ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
          } focus:border-primary-500 focus:ring-2 focus:ring-opacity-30 bg-white dark:bg-dark-100 text-gray-900 dark:text-gray-100 transition-all duration-200`}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};