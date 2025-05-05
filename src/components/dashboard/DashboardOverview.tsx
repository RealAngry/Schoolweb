import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../utils/api';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Clock,
  Bell,
  Inbox,
  TrendingUp,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon, 
  title, 
  value, 
  change, 
  trend,
  loading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
          {icon}
        </div>
        {loading ? (
          <RefreshCw size={16} className="text-gray-400 animate-spin" />
        ) : null}
      </div>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-4">{title}</h3>
      <div className="flex items-end justify-between mt-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {loading ? (
            <span className="inline-block w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
          ) : (
            value
          )}
        </p>
        {change && (
          <span className={`text-sm flex items-center ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-gray-500'
          }`}>
            {trend === 'up' && <TrendingUp size={14} className="mr-1" />}
            {trend === 'down' && <TrendingUp size={14} className="mr-1 rotate-180" />}
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
};

interface ActivityItem {
  id: string;
  type: 'notification' | 'message' | 'event';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  title, 
  description, 
  icon, 
  onClick 
}) => {
  return (
    <button
      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      onClick={onClick}
    >
      <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-4">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <ChevronRight size={16} className="ml-auto text-gray-400" />
    </button>
  );
};

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalClasses: 0,
    totalEvents: 0,
  });
  
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch user statistics
        const usersResponse = await userApi.getUsers();
        const users = usersResponse.data || [];
        
        // Calculate statistics
        const userCount = users.length;
        const teacherCount = users.filter((u: any) => u.role === 'teacher').length;
        
        // For demo purposes, generate mock data
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Mock recent activities
        const mockActivities: ActivityItem[] = [
          {
            id: '1',
            type: 'notification',
            title: 'New Student Admission',
            description: 'Rahul Sharma has submitted a new admission form',
            time: '30 minutes ago',
            read: false
          },
          {
            id: '2',
            type: 'message',
            title: 'Message from Parent',
            description: 'Mrs. Gupta has sent a message regarding tuition fees',
            time: '2 hours ago',
            read: true
          },
          {
            id: '3',
            type: 'event',
            title: 'Upcoming Event',
            description: 'Annual Sports Day scheduled for next week',
            time: 'Tomorrow',
            read: false
          },
          {
            id: '4',
            type: 'notification',
            title: 'New Teacher Joined',
            description: 'Mrs. Verma has joined the Science department',
            time: '1 day ago',
            read: true
          }
        ];
        
        // Update state with fetched and mock data
        setStats({
          totalUsers: userCount,
          totalStudents: 45 + Math.floor(Math.random() * 10), // Mock data
          totalClasses: 12,
          totalEvents: 3 + Math.floor(Math.random() * 5), // Mock data
        });
        
        setRecentActivity(mockActivities);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Date formatting helper
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Navigation helper
  const navigate = (path: string) => {
    window.location.href = path;
  };

  const navigateToUserManagement = () => {
    navigate('/dashboard/users');
  };

  const navigateToStudentManagement = () => {
    navigate('/dashboard/students');
  };

  const navigateToCalendar = () => {
    navigate('/dashboard/calendar');
  };

  const navigateToMessages = () => {
    navigate('/dashboard/messages');
  };

  return (
    <div className="space-y-6">
      {/* Welcome message and date */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.displayName || 'Administrator'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {formatDate(new Date())}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 md:mt-0"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={14} className="mr-2" />
          Refresh Dashboard
        </Button>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Users className="text-blue-600 dark:text-blue-400" size={24} />}
          title="Total Users"
          value={stats.totalUsers}
          change="+12% this month"
          trend="up"
          loading={loading}
        />
        <StatsCard
          icon={<GraduationCap className="text-green-600 dark:text-green-400" size={24} />}
          title="Students"
          value={stats.totalStudents}
          change="+5% this month"
          trend="up"
          loading={loading}
        />
        <StatsCard
          icon={<BookOpen className="text-amber-600 dark:text-amber-400" size={24} />}
          title="Classes"
          value={stats.totalClasses}
          loading={loading}
        />
        <StatsCard
          icon={<Calendar className="text-purple-600 dark:text-purple-400" size={24} />}
          title="Upcoming Events"
          value={stats.totalEvents}
          change="2 this week"
          trend="neutral"
          loading={loading}
        />
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 lg:col-span-1"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <QuickAction
              title="Manage Users"
              description="Add, edit or remove system users"
              icon={<Users size={18} />}
              onClick={navigateToUserManagement}
            />
            <QuickAction
              title="Student Records"
              description="View and manage student information"
              icon={<GraduationCap size={18} />}
              onClick={navigateToStudentManagement}
            />
            <QuickAction
              title="School Calendar"
              description="Schedule events and activities"
              icon={<Calendar size={18} />}
              onClick={navigateToCalendar}
            />
            <QuickAction
              title="Messages"
              description="View parent and staff communications"
              icon={<Inbox size={18} />}
              onClick={navigateToMessages}
            />
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-start space-x-4 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-700">
              {recentActivity.map(activity => (
                <div key={activity.id} className={`flex items-start pt-4 ${activity.id !== '1' ? 'mt-4' : ''}`}>
                  <div className={`p-2 rounded-full mr-4 ${
                    activity.type === 'notification' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                    activity.type === 'message' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                    'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {activity.type === 'notification' && <Bell size={16} />}
                    {activity.type === 'message' && <Inbox size={16} />}
                    {activity.type === 'event' && <Calendar size={16} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                        {activity.title}
                        {!activity.read && (
                          <span className="ml-2 w-2 h-2 rounded-full bg-blue-600"></span>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 text-center">
            <Button variant="ghost" size="sm" className="text-sm text-blue-600 dark:text-blue-400">
              View All Activity
              <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview; 