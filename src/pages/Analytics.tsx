import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { DonutChart } from '../components/dashboard/DonutChart';
import { revenueData, userActivityData, deviceData, trafficSourceData } from '../data/mockData';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Detailed insights and performance metrics.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900 dark:text-white mr-2">3.2%</span>
                <span className="text-xs text-green-600 dark:text-green-400">+0.5%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '32%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-primary-600 h-2.5 rounded-full"
              ></motion.div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600 dark:text-gray-400">Avg. Session Duration</span>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900 dark:text-white mr-2">2m 45s</span>
                <span className="text-xs text-green-600 dark:text-green-400">+12s</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1, delay: 0.6 }}
                className="bg-secondary-600 h-2.5 rounded-full"
              ></motion.div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600 dark:text-gray-400">Bounce Rate</span>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900 dark:text-white mr-2">42.3%</span>
                <span className="text-xs text-red-600 dark:text-red-400">+2.1%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '42.3%' }}
                transition={{ duration: 1, delay: 0.7 }}
                className="bg-red-500 h-2.5 rounded-full"
              ></motion.div>
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Pages</h3>
          <div className="space-y-4">
            {[
              { page: '/dashboard', visits: 1245, time: '1m 32s' },
              { page: '/products', visits: 932, time: '2m 14s' },
              { page: '/analytics', visits: 621, time: '3m 05s' },
              { page: '/settings', visits: 432, time: '1m 17s' },
              { page: '/users', visits: 298, time: '2m 43s' },
            ].map((item, index) => (
              <motion.div
                key={item.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-dark-100 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.page}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg. time: {item.time}</p>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{item.visits.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <ActivityChart data={userActivityData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonutChart data={deviceData} title="Device Distribution" />
        <DonutChart data={trafficSourceData} title="Traffic Sources" />
      </div>
    </div>
  );
};