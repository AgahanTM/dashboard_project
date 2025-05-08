import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Lock, Bell, Shield } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const SettingsForm: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formState, setFormState] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    sessionTimeout: true,
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (setting: string) => {
    setFormState(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof formState] }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
  ];
  
  return (
    <div>
      <div className="mb-6 flex overflow-x-auto">
        <div className="flex space-x-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <AnimatedTabContent activeTab={activeTab} formState={formState} handleInputChange={handleInputChange} handleToggleChange={handleToggleChange} />
        
        <div className="mt-6 flex items-center justify-end">
          {saveSuccess && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="mr-4 text-green-600 dark:text-green-400"
            >
              Settings saved successfully!
            </motion.p>
          )}
          <Button
            type="submit"
            disabled={isSaving}
            icon={<Save size={18} />}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

interface AnimatedTabContentProps {
  activeTab: string;
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleChange: (setting: string) => void;
}

const AnimatedTabContent: React.FC<AnimatedTabContentProps> = ({
  activeTab,
  formState,
  handleInputChange,
  handleToggleChange,
}) => {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {activeTab === 'profile' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
          <div className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              icon={<User size={18} />}
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              icon={<Mail size={18} />}
              required
            />
          </div>
        </Card>
      )}
      
      {activeTab === 'notifications' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
              </div>
              <Toggle
                isOn={formState.emailNotifications}
                onToggle={() => handleToggleChange('emailNotifications')}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications on your device</p>
              </div>
              <Toggle
                isOn={formState.pushNotifications}
                onToggle={() => handleToggleChange('pushNotifications')}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Marketing Emails</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive marketing and promotional emails</p>
              </div>
              <Toggle
                isOn={formState.marketingEmails}
                onToggle={() => handleToggleChange('marketingEmails')}
              />
            </div>
          </div>
        </Card>
      )}
      
      {activeTab === 'security' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h3>
          <div className="space-y-4 mb-6">
            <Input
              label="Current Password"
              type="password"
              name="currentPassword"
              value={formState.currentPassword}
              onChange={handleInputChange}
              icon={<Lock size={18} />}
            />
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={formState.newPassword}
              onChange={handleInputChange}
              icon={<Lock size={18} />}
            />
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleInputChange}
              icon={<Lock size={18} />}
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <Toggle
                isOn={formState.twoFactorAuth}
                onToggle={() => handleToggleChange('twoFactorAuth')}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Session Timeout</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after inactivity</p>
              </div>
              <Toggle
                isOn={formState.sessionTimeout}
                onToggle={() => handleToggleChange('sessionTimeout')}
              />
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};