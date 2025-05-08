import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from '../ui/Card';

interface RevenueChartProps {
  data: Array<{ name: string; value: number; previous: number }>;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-block w-3 h-3 rounded-full bg-primary-500 mr-1"></span>
          Current
          <span className="inline-block w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-3 mr-1"></span>
          Previous
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tickFormatter={(value) => `$${value/1000}k`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke="#9ca3af" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  );
};