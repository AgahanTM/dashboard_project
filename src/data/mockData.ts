import { User, Stat, ChartData } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'Admin',
    lastActive: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'Editor',
    lastActive: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'User',
    lastActive: '3 days ago',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'User',
    lastActive: '5 hours ago',
    status: 'active',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'Editor',
    lastActive: '2 days ago',
    status: 'inactive',
  },
];

export const mockStats: Stat[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: 24580,
    change: 12.5,
    icon: 'dollar-sign',
  },
  {
    id: '2',
    title: 'Active Users',
    value: 3245,
    change: 8.2,
    icon: 'users',
  },
  {
    id: '3',
    title: 'New Signups',
    value: 573,
    change: -2.3,
    icon: 'user-plus',
  },
  {
    id: '4',
    title: 'Bounce Rate',
    value: 42,
    change: -5.1,
    icon: 'activity',
  },
];

export const revenueData: ChartData[] = [
  { name: 'Jan', value: 4000, previous: 3200 },
  { name: 'Feb', value: 3000, previous: 2800 },
  { name: 'Mar', value: 5000, previous: 4300 },
  { name: 'Apr', value: 4500, previous: 3900 },
  { name: 'May', value: 6000, previous: 5100 },
  { name: 'Jun', value: 5500, previous: 4800 },
  { name: 'Jul', value: 7000, previous: 5900 },
];

export const userActivityData: ChartData[] = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 150 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 170 },
  { name: 'Fri', value: 190 },
  { name: 'Sat', value: 110 },
  { name: 'Sun', value: 85 },
];

export const deviceData: ChartData[] = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 },
];

export const trafficSourceData: ChartData[] = [
  { name: 'Direct', value: 30 },
  { name: 'Organic', value: 25 },
  { name: 'Referral', value: 20 },
  { name: 'Social', value: 15 },
  { name: 'Email', value: 10 },
];