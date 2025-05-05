import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Check, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Ban, 
  MoreVertical,
  Calendar,
  RefreshCw,
  Settings,
  AlertTriangle,
  BellOff
} from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { useAuth } from '../../context/AuthContext';

// Define notification interfaces
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: Date;
  read: boolean;
  actionRequired?: boolean;
  link?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notifyOnNewMessages: boolean;
  notifyOnSystemUpdates: boolean;
  notifyOnStudentActivity: boolean;
  notifyOnUserRegistration: boolean;
  notifyOnContentUpdates: boolean;
  dailyDigest: boolean;
}

// Generate mock notifications
const generateMockNotifications = (): Notification[] => {
  const now = new Date();
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'System Update',
      message: 'The system will undergo maintenance tonight from 2 AM to 4 AM. Please save your work before this time.',
      type: 'info',
      date: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
    },
    {
      id: '2',
      title: 'New User Registration',
      message: 'A new teacher "John Smith" has registered and is awaiting approval.',
      type: 'info',
      date: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: false,
      actionRequired: true,
      link: '/dashboard/users'
    },
    {
      id: '3',
      title: 'Content Update',
      message: 'The science curriculum for Grade 8 has been updated. Please review the changes.',
      type: 'info',
      date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      link: '/dashboard/content'
    },
    {
      id: '4',
      title: 'Error in Attendance System',
      message: 'There was an error processing attendance records for Class 10B. Please check and update manually.',
      type: 'error',
      date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      actionRequired: true
    },
    {
      id: '5',
      title: 'Student Performance Alert',
      message: 'Multiple students in Grade 9 have scored below 50% in recent mathematics assessment.',
      type: 'warning',
      date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true
    },
    {
      id: '6',
      title: 'New Message',
      message: 'You have received a new message from Principal regarding upcoming parent-teacher meeting.',
      type: 'info',
      date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: false,
      link: '/dashboard/messages'
    },
    {
      id: '7',
      title: 'Backup Successful',
      message: 'Weekly system backup completed successfully.',
      type: 'success',
      date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      read: true
    },
    {
      id: '8',
      title: 'Calendar Update',
      message: 'Annual Sports Day has been rescheduled to November 15th.',
      type: 'warning',
      date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      read: true,
      link: '/dashboard/calendar'
    },
    {
      id: '9',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected for your account. Please verify your account security.',
      type: 'error',
      date: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      read: true,
      actionRequired: true
    },
    {
      id: '10',
      title: 'System Update Complete',
      message: 'The system has been updated to version 2.5.0 with new features and improvements.',
      type: 'success',
      date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      read: true
    },
  ];
  
  return notifications;
};

// Format date helper
const formatNotificationDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) {
    return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

// Get icon based on notification type
const getNotificationIcon = (type: Notification['type'], size = 16) => {
  switch (type) {
    case 'info':
      return <Info size={size} className="text-blue-500" />;
    case 'success':
      return <CheckCircle size={size} className="text-green-500" />;
    case 'warning':
      return <AlertTriangle size={size} className="text-amber-500" />;
    case 'error':
      return <AlertCircle size={size} className="text-red-500" />;
    default:
      return <Bell size={size} className="text-gray-500" />;
  }
};

const NotificationsPanel: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Default notification settings
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    notifyOnNewMessages: true,
    notifyOnSystemUpdates: true,
    notifyOnStudentActivity: user?.role === 'teacher',
    notifyOnUserRegistration: user?.role === 'admin',
    notifyOnContentUpdates: true,
    dailyDigest: false
  });

  // Fetch notifications (mock)
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const mockData = generateMockNotifications();
      setNotifications(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'action':
        return notifications.filter(n => n.actionRequired);
      default:
        return notifications;
    }
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  // Toggle notification setting
  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  // Get badge color based on notification type
  const getBadgeVariant = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'default';
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage system notifications and alerts
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={!notifications.some(n => !n.read)}
          >
            <Check size={16} className="mr-2" />
            Mark All Read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettingsModal(true)}
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-1 flex-col overflow-hidden">
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <div className="border-b border-gray-200 dark:border-gray-700 px-4">
            <div className="flex justify-between items-center">
              <TabsList className="mt-2">
                <TabsTrigger value="all" className="relative">
                  All
                  <Badge variant="default" className="ml-2">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="relative">
                  Unread
                  <Badge variant="default" className="ml-2">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="action" className="relative">
                  Action Required
                  <Badge variant="default" className="ml-2">
                    {notifications.filter(n => n.actionRequired).length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="hidden md:flex"
              >
                <RefreshCw size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <TabsContent value="all" className="h-full flex flex-col">
              {renderNotificationsList(getFilteredNotifications())}
            </TabsContent>
            <TabsContent value="unread" className="h-full flex flex-col">
              {renderNotificationsList(getFilteredNotifications())}
            </TabsContent>
            <TabsContent value="action" className="h-full flex flex-col">
              {renderNotificationsList(getFilteredNotifications())}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Notification Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Notification Delivery
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="flex flex-col">
                  <span>Email Notifications</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Receive notifications via email
                  </span>
                </Label>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => toggleSetting('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications" className="flex flex-col">
                  <span>Push Notifications</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Receive push notifications in browser
                  </span>
                </Label>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={() => toggleSetting('pushNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dailyDigest" className="flex flex-col">
                  <span>Daily Digest</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Receive a summary of notifications once per day
                  </span>
                </Label>
                <Switch
                  id="dailyDigest"
                  checked={settings.dailyDigest}
                  onCheckedChange={() => toggleSetting('dailyDigest')}
                />
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Notification Types
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyOnNewMessages" className="flex flex-col">
                    <span>New Messages</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Notify when you receive new messages
                    </span>
                  </Label>
                  <Switch
                    id="notifyOnNewMessages"
                    checked={settings.notifyOnNewMessages}
                    onCheckedChange={() => toggleSetting('notifyOnNewMessages')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyOnSystemUpdates" className="flex flex-col">
                    <span>System Updates</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Notify about system maintenance and updates
                    </span>
                  </Label>
                  <Switch
                    id="notifyOnSystemUpdates"
                    checked={settings.notifyOnSystemUpdates}
                    onCheckedChange={() => toggleSetting('notifyOnSystemUpdates')}
                  />
                </div>
                
                {user?.role === 'teacher' && (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifyOnStudentActivity" className="flex flex-col">
                      <span>Student Activity</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Notify about important student activities
                      </span>
                    </Label>
                    <Switch
                      id="notifyOnStudentActivity"
                      checked={settings.notifyOnStudentActivity}
                      onCheckedChange={() => toggleSetting('notifyOnStudentActivity')}
                    />
                  </div>
                )}
                
                {user?.role === 'admin' && (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifyOnUserRegistration" className="flex flex-col">
                      <span>User Registration</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Notify when new users register
                      </span>
                    </Label>
                    <Switch
                      id="notifyOnUserRegistration"
                      checked={settings.notifyOnUserRegistration}
                      onCheckedChange={() => toggleSetting('notifyOnUserRegistration')}
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyOnContentUpdates" className="flex flex-col">
                    <span>Content Updates</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Notify when content is updated
                    </span>
                  </Label>
                  <Switch
                    id="notifyOnContentUpdates"
                    checked={settings.notifyOnContentUpdates}
                    onCheckedChange={() => toggleSetting('notifyOnContentUpdates')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 justify-between items-center">
            <Button 
              variant="destructive" 
              onClick={clearAllNotifications}
              size="sm"
            >
              Clear All Notifications
            </Button>
            <Button onClick={() => setShowSettingsModal(false)}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  // Helper function to render notifications list
  function renderNotificationsList(filteredNotifications: Notification[]) {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <RefreshCw size={24} className="animate-spin text-primary" />
        </div>
      );
    }
    
    if (filteredNotifications.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <BellOff size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No notifications found
          </p>
        </div>
      );
    }
    
    return (
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 ${
              !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1">
                {getNotificationIcon(notification.type, 20)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className={`text-sm font-medium ${
                    !notification.read 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {notification.title}
                  </h3>
                  <div className="ml-2 flex items-center space-x-2">
                    <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400">
                      {formatNotificationDate(notification.date)}
                    </span>
                    
                    <Badge 
                      variant={getBadgeVariant(notification.type) as any}
                      className="hidden sm:inline-flex"
                    >
                      {notification.type}
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        {notification.link && (
                          <DropdownMenuItem>
                            <a href={notification.link} className="flex items-center w-full">
                              View Details
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {notification.message}
                </p>
                
                <div className="mt-2 flex items-center space-x-3">
                  <span className="sm:hidden inline-flex text-xs text-gray-500 dark:text-gray-400">
                    {formatNotificationDate(notification.date)}
                  </span>
                  
                  <Badge 
                    variant={getBadgeVariant(notification.type) as any}
                    className="sm:hidden inline-flex"
                  >
                    {notification.type}
                  </Badge>
                  
                  {notification.actionRequired && (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      Action Required
                    </Badge>
                  )}
                  
                  {notification.link && (
                    <a 
                      href={notification.link}
                      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View Details
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default NotificationsPanel; 