export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface Stat {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}