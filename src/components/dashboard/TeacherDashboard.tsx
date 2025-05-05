import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  FileCheck, 
  Calendar, 
  Clock, 
  Activity,
  Clipboard,
  MessageSquare,
  ChevronRight,
  User,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Define interfaces
interface ClassData {
  id: string;
  name: string;
  grade: string;
  section: string;
  subject: string;
  studentsCount: number;
  schedule: string;
  nextLesson: string;
  attendancePercentage: number;
  assignmentCompletePercentage: number;
}

interface Announcement {
  id: string;
  title: string;
  date: Date;
  type: 'general' | 'assignment' | 'event' | 'alert';
  message: string;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'class' | 'meeting' | 'exam' | 'activity';
  location?: string;
  description?: string;
}

// Generate mock data
const generateMockClasses = (): ClassData[] => {
  return [
    {
      id: 'class1',
      name: 'Mathematics',
      grade: '9',
      section: 'A',
      subject: 'Mathematics',
      studentsCount: 32,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      nextLesson: 'Algebraic Equations',
      attendancePercentage: 94,
      assignmentCompletePercentage: 87
    },
    {
      id: 'class2',
      name: 'Science',
      grade: '10',
      section: 'B',
      subject: 'Physics',
      studentsCount: 28,
      schedule: 'Tue, Thu - 11:00 AM',
      nextLesson: 'Newton\'s Laws of Motion',
      attendancePercentage: 90,
      assignmentCompletePercentage: 76
    },
    {
      id: 'class3',
      name: 'English Literature',
      grade: '11',
      section: 'C',
      subject: 'English',
      studentsCount: 25,
      schedule: 'Mon, Wed - 1:00 PM',
      nextLesson: 'Shakespeare\'s Hamlet',
      attendancePercentage: 88,
      assignmentCompletePercentage: 92
    },
    {
      id: 'class4',
      name: 'Chemistry',
      grade: '10',
      section: 'A',
      subject: 'Chemistry',
      studentsCount: 30,
      schedule: 'Tue, Thu - 9:00 AM',
      nextLesson: 'Periodic Table',
      attendancePercentage: 91,
      assignmentCompletePercentage: 83
    }
  ];
};

const generateMockAnnouncements = (): Announcement[] => {
  const now = new Date();
  
  return [
    {
      id: 'ann1',
      title: 'Parent-Teacher Meeting',
      date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      type: 'general',
      message: 'Parent-teacher meetings are scheduled for next Friday. Please prepare student progress reports.'
    },
    {
      id: 'ann2',
      title: 'Assignment Due Date Extended',
      date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      type: 'assignment',
      message: 'The due date for the Grade 10 Science project has been extended to next Monday.'
    },
    {
      id: 'ann3',
      title: 'System Maintenance',
      date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      type: 'alert',
      message: 'The school management system will be under maintenance this Saturday from 10 PM to 2 AM.'
    },
    {
      id: 'ann4',
      title: 'Annual Sports Day',
      date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
      type: 'event',
      message: 'Annual Sports Day is scheduled for November 15th. Please encourage students to participate.'
    },
  ];
};

const generateMockEvents = (): Event[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return [
    {
      id: 'evt1',
      title: 'Grade 10 Mathematics Class',
      date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
      type: 'class',
      location: 'Room 101',
      description: 'Lesson on Linear Equations'
    },
    {
      id: 'evt2',
      title: 'Department Meeting',
      date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
      type: 'meeting',
      location: 'Conference Room',
      description: 'Discussion about curriculum updates'
    },
    {
      id: 'evt3',
      title: 'Mid-term Exam',
      date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
      type: 'exam',
      location: 'Examination Hall',
      description: 'Science mid-term examination'
    },
    {
      id: 'evt4',
      title: 'Science Club',
      date: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000),
      type: 'activity',
      location: 'Science Lab',
      description: 'Weekly science club meeting and experiments'
    },
  ];
};

// Helper to format date
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
};

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load mock data
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setClasses(generateMockClasses());
      setAnnouncements(generateMockAnnouncements());
      setEvents(generateMockEvents());
      setLoading(false);
    }, 1000);
  }, []);

  // Get event type color
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'meeting': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'exam': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'activity': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Get announcement type icon
  const getAnnouncementIcon = (type: Announcement['type'], size = 20) => {
    switch (type) {
      case 'general': return <MessageSquare size={size} className="text-blue-500" />;
      case 'assignment': return <FileCheck size={size} className="text-green-500" />;
      case 'event': return <Calendar size={size} className="text-purple-500" />;
      case 'alert': return <AlertTriangle size={size} className="text-amber-500" />;
      default: return <MessageSquare size={size} className="text-gray-500" />;
    }
  };
  
  // Navigate to class detail
  const handleViewClass = (classId: string) => {
    navigate(`/dashboard/students?class=${classId}`);
  };
  
  return (
    <div className="h-[calc(100vh-180px)] overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.displayName || 'Teacher'}! Here's an overview of your classes and activities.
          </p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <RefreshCw size={24} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Classes</CardTitle>
                <CardDescription>
                  Manage your classes, attendance, and assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((classItem) => (
                    <div 
                      key={classItem.id} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {classItem.name} - Grade {classItem.grade}{classItem.section}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <BookOpen size={14} className="mr-1" />
                            <span>{classItem.subject}</span>
                            <span className="mx-2">•</span>
                            <Users size={14} className="mr-1" />
                            <span>{classItem.studentsCount} students</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>{classItem.schedule}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewClass(classItem.id)}
                        >
                          View Class
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Attendance
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {classItem.attendancePercentage}%
                            </span>
                          </div>
                          <Progress value={classItem.attendancePercentage} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Assignments Completed
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {classItem.assignmentCompletePercentage}%
                            </span>
                          </div>
                          <Progress value={classItem.assignmentCompletePercentage} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Next Lesson:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{classItem.nextLesson}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/classes')}>
                  View All Classes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>
                  School-wide announcements and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div 
                      key={announcement.id} 
                      className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 pt-1">
                        {getAnnouncementIcon(announcement.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">
                          {announcement.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {announcement.message}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Posted: {formatDate(announcement.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/notifications')}>
                  View All Announcements
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Sidebar (1/3 width on large screens) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
                <CardDescription>
                  Your upcoming classes and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div 
                      key={event.id} 
                      className="border-l-4 pl-3 py-2"
                      style={{ 
                        borderLeftColor: 
                          event.type === 'class' ? '#3b82f6' :
                          event.type === 'meeting' ? '#8b5cf6' :
                          event.type === 'exam' ? '#ef4444' :
                          '#10b981'
                      }}
                    >
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center mt-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {event.description}
                        </p>
                      )}
                      <div className="mt-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Calendar
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/dashboard/students')}>
                    <Users size={16} className="mr-2" />
                    Manage Students
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/dashboard/assignments')}>
                    <Clipboard size={16} className="mr-2" />
                    Create Assignment
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/dashboard/messages')}>
                    <MessageSquare size={16} className="mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Activity size={16} className="mr-2" />
                    Track Performance
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Classes</div>
                    <div className="font-medium text-gray-900 dark:text-white">{classes.length}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Students</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {classes.reduce((acc, curr) => acc + curr.studentsCount, 0)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Average Attendance</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {Math.round(
                        classes.reduce((acc, curr) => acc + curr.attendancePercentage, 0) / 
                        Math.max(1, classes.length)
                      )}%
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Assignments</div>
                    <div className="font-medium text-gray-900 dark:text-white">12</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard; 