import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: string;
  delay?: number;
  formatValue?: (value: number) => string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  delay = 0,
  formatValue = (val) => {
    if (title.toLowerCase().includes('rate')) return `${val}%`;
    return val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`;
  },
}) => {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Activity;
  
  return (
    <Card delay={delay} className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            <AnimatedCounter value={value} formatValue={formatValue} />
          </h3>
        </div>
        <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          <IconComponent size={20} />
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: 'spring' }}
          className={`flex items-center ${
            change >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="ml-1 text-sm font-medium">{Math.abs(change)}%</span>
        </motion.div>
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">vs last month</span>
      </div>
    </Card>
  );
};