import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onToggle,
  label,
  disabled = false,
}) => {
  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  };

  return (
    <div className="flex items-center">
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <motion.button
        className={`w-12 h-6 rounded-full p-1 ${
          isOn ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={disabled ? undefined : onToggle}
        aria-label={label || 'Toggle'}
        whileTap={disabled ? undefined : { scale: 0.95 }}
      >
        <motion.div
          className="w-4 h-4 bg-white rounded-full"
          layout
          transition={spring}
          animate={{ x: isOn ? 24 : 0 }}
        />
      </motion.button>
    </div>
  );
};