import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  Bell, 
  MessageSquare, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  User, 
  Moon, 
  Sun,
  Flag
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Toaster } from '../ui/toaster';

// Define interface for navigation items
interface NavItem {
  name: string;
  to: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  teacherOnly?: boolean;
  studentOnly?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  
  // Navigation items based on role
  const navigationItems: NavItem[] = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: <Home size={20} />,
    },
    {
      name: 'Users',
      to: '/dashboard/users',
      icon: <Users size={20} />,
      adminOnly: true,
    },
    {
      name: 'Students',
      to: '/dashboard/students',
      icon: <BookOpen size={20} />,
      teacherOnly: true,
    },
    {
      name: 'Reports',
      to: '/dashboard/reports',
      icon: <FileText size={20} />,
      adminOnly: true,
    },
    {
      name: 'School Journey',
      to: '/dashboard/journey',
      icon: <Flag size={20} />,
    },
    {
      name: 'Messages',
      to: '/dashboard/messages',
      icon: <MessageSquare size={20} />,
    },
    {
      name: 'Settings',
      to: '/dashboard/settings',
      icon: <Settings size={20} />,
    },
  ];
  
  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(
    item =>
      (!item.adminOnly || (item.adminOnly && user?.role === 'admin')) &&
      (!item.teacherOnly || (item.teacherOnly && (user?.role === 'teacher' || user?.role === 'admin'))) &&
      (!item.studentOnly || (item.studentOnly && user?.role === 'student' as any))
  );
  
  // Handle logout
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.div
        initial={{ x: isSidebarOpen ? 0 : -240 }}
        animate={{ x: isSidebarOpen ? 0 : -240 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-60 bg-white dark:bg-gray-800 shadow-md overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">School MS</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <X size={20} />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {filteredNavItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/dashboard'}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
                      )
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar footer with user info */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="flex items-center"
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span className="ml-2">{isDarkMode ? 'Light' : 'Dark'}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400"
              >
                <LogOut size={16} />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main content */}
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        isSidebarOpen ? "md:ml-60" : "ml-0"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-2"
              >
                <Menu size={20} />
              </Button>
              <h1 className="text-lg font-medium text-gray-900 dark:text-white">
                {user?.role === 'admin' ? 'Admin Dashboard' : 
                 user?.role === 'teacher' ? 'Teacher Dashboard' : 
                 'Student Dashboard'}
              </h1>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default DashboardLayout; 