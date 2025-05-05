import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Search, 
  User, 
  MoreVertical, 
  Clock,
  ArrowLeft,
  Paperclip,
  RefreshCw,
  Check,
  Star,
  StarOff,
  Trash2,
  Inbox,
  File,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../context/AuthContext';
import { Label } from '../ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Textarea } from '../ui/textarea';
import { Avatar } from '../ui/avatar';
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

// Define message interface
interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  recipient: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
  attachments: Array<{
    id: string;
    name: string;
    type: 'image' | 'document';
    url: string;
    size: string;
  }>;
}

// Generate mock users
const mockUsers = [
  { id: 'user1', name: 'Admin User', role: 'admin', avatar: '' },
  { id: 'user2', name: 'John Teacher', role: 'teacher', avatar: '' },
  { id: 'user3', name: 'Sarah Teacher', role: 'teacher', avatar: '' },
  { id: 'user4', name: 'Mike Staff', role: 'staff', avatar: '' },
  { id: 'user5', name: 'Parent Singh', role: 'parent', avatar: '' },
  { id: 'user6', name: 'Parent Gupta', role: 'parent', avatar: '' },
];

// Generate mock messages
const generateMockMessages = (): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  
  // Add some incoming messages
  for (let i = 0; i < 10; i++) {
    const sender = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const recipient = mockUsers[0]; // Current user (admin)
    
    const hasAttachments = Math.random() > 0.7;
    const attachments = hasAttachments ? [
      {
        id: `att-${i}-1`,
        name: Math.random() > 0.5 ? 'document.pdf' : 'image.jpg',
        type: Math.random() > 0.5 ? 'document' as const : 'image' as const,
        url: '#',
        size: `${Math.floor(Math.random() * 10) + 1}MB`
      }
    ] : [];
    
    messages.push({
      id: `msg-${i}`,
      sender,
      recipient,
      subject: `Message Subject ${i + 1}`,
      content: `This is the content of message ${i + 1}. It contains some text that should be displayed in the message view. It might be a long text with multiple sentences to test the display of message content.`,
      timestamp: new Date(now.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      read: Math.random() > 0.5,
      starred: Math.random() > 0.8,
      attachments
    });
  }
  
  // Add some outgoing messages
  for (let i = 0; i < 5; i++) {
    const sender = mockUsers[0]; // Current user (admin)
    const recipient = mockUsers[Math.floor(Math.random() * (mockUsers.length - 1)) + 1];
    
    const hasAttachments = Math.random() > 0.7;
    const attachments = hasAttachments ? [
      {
        id: `att-sent-${i}-1`,
        name: Math.random() > 0.5 ? 'report.pdf' : 'screenshot.png',
        type: Math.random() > 0.5 ? 'document' as const : 'image' as const,
        url: '#',
        size: `${Math.floor(Math.random() * 10) + 1}MB`
      }
    ] : [];
    
    messages.push({
      id: `msg-sent-${i}`,
      sender,
      recipient,
      subject: `Sent Message ${i + 1}`,
      content: `This is a message that was sent by you to ${recipient.name}. It contains some text content that might be long or short depending on the nature of the communication.`,
      timestamp: new Date(now.getTime() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)),
      read: true,
      starred: Math.random() > 0.8,
      attachments
    });
  }
  
  // Sort by timestamp (newest first)
  return messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Format date helper
const formatMessageDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Today - show time
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    // Within last week - show day name
    return date.toLocaleDateString([], { weekday: 'long' });
  } else {
    // Older - show date
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  }
};

const MessagesPanel: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMode, setViewMode] = useState<'inbox' | 'sent' | 'starred' | 'message'>('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showComposeModal, setShowComposeModal] = useState(false);
  
  // New message form state
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  });

  // Fetch messages (mock)
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const mockData = generateMockMessages();
      setMessages(mockData);
      filterMessages(mockData, viewMode, searchTerm);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter messages when viewMode or searchTerm changes
  useEffect(() => {
    filterMessages(messages, viewMode, searchTerm);
  }, [viewMode, searchTerm]);

  // Filter messages based on view mode and search term
  const filterMessages = (allMessages: Message[], mode: string, search: string) => {
    let filtered = [...allMessages];
    
    // Filter by view mode
    if (mode === 'inbox') {
      filtered = filtered.filter(msg => msg.recipient.id === 'user1'); // Assuming current user is user1
    } else if (mode === 'sent') {
      filtered = filtered.filter(msg => msg.sender.id === 'user1'); // Assuming current user is user1
    } else if (mode === 'starred') {
      filtered = filtered.filter(msg => msg.starred);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(msg => 
        msg.subject.toLowerCase().includes(searchLower) ||
        msg.content.toLowerCase().includes(searchLower) ||
        msg.sender.name.toLowerCase().includes(searchLower) ||
        msg.recipient.name.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredMessages(filtered);
  };

  // Mark message as read when selected
  const handleSelectMessage = (message: Message) => {
    if (!message.read) {
      const updatedMessages = messages.map(msg => 
        msg.id === message.id ? { ...msg, read: true } : msg
      );
      setMessages(updatedMessages);
      filterMessages(updatedMessages, viewMode, searchTerm);
    }
    
    setSelectedMessage(message);
    setViewMode('message');
  };

  // Toggle starred status
  const handleToggleStar = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    );
    setMessages(updatedMessages);
    
    // Update selected message if it's the one being starred/unstarred
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage({
        ...selectedMessage,
        starred: !selectedMessage.starred
      });
    }
    
    filterMessages(updatedMessages, viewMode, searchTerm);
  };

  // Delete message
  const handleDeleteMessage = (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId);
      setMessages(updatedMessages);
      
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
        setViewMode('inbox');
      }
      
      filterMessages(updatedMessages, viewMode, searchTerm);
    }
  };

  // Send new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.recipient || !newMessage.subject || !newMessage.content) {
      alert('Please fill all required fields');
      return;
    }
    
    // Find recipient user
    const recipientUser = mockUsers.find(u => u.id === newMessage.recipient);
    
    if (!recipientUser) {
      alert('Invalid recipient');
      return;
    }
    
    // Create new message
    const newMsg: Message = {
      id: `msg-new-${Date.now()}`,
      sender: {
        id: 'user1', // Current user
        name: user?.displayName || 'Admin User',
        role: user?.role || 'admin'
      },
      recipient: recipientUser,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date(),
      read: true,
      starred: false,
      attachments: []
    };
    
    // Add to messages
    const updatedMessages = [newMsg, ...messages];
    setMessages(updatedMessages);
    filterMessages(updatedMessages, viewMode, searchTerm);
    
    // Reset form and close modal
    setNewMessage({
      recipient: '',
      subject: '',
      content: ''
    });
    setShowComposeModal(false);
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage communications with teachers, staff, and parents
          </p>
        </div>
        
        <Button
          onClick={() => setShowComposeModal(true)}
          className="mt-4 md:mt-0 flex items-center"
        >
          <Mail size={16} className="mr-2" />
          Compose New Message
        </Button>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 hidden md:block">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <nav>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => {
                      setViewMode('inbox');
                      setSelectedMessage(null);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
                      viewMode === 'inbox' && !selectedMessage
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <Inbox size={18} className="mr-2" />
                      <span>Inbox</span>
                    </div>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full px-2 py-0.5">
                      {messages.filter(m => m.recipient.id === 'user1' && !m.read).length}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setViewMode('sent');
                      setSelectedMessage(null);
                    }}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                      viewMode === 'sent' && !selectedMessage
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Send size={18} className="mr-2" />
                    <span>Sent</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setViewMode('starred');
                      setSelectedMessage(null);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
                      viewMode === 'starred' && !selectedMessage
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <Star size={18} className="mr-2" />
                      <span>Starred</span>
                    </div>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full px-2 py-0.5">
                      {messages.filter(m => m.starred).length}
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Message List and View */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Navigation */}
            <div className="md:hidden border-b border-gray-200 dark:border-gray-700 p-2 flex justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewMode('inbox');
                    setSelectedMessage(null);
                  }}
                  className={viewMode === 'inbox' && !selectedMessage ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                >
                  Inbox ({messages.filter(m => m.recipient.id === 'user1' && !m.read).length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewMode('sent');
                    setSelectedMessage(null);
                  }}
                  className={viewMode === 'sent' && !selectedMessage ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                >
                  Sent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewMode('starred');
                    setSelectedMessage(null);
                  }}
                  className={viewMode === 'starred' && !selectedMessage ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                >
                  Starred
                </Button>
              </div>
              <Button size="sm" variant="ghost" onClick={() => window.location.reload()}>
                <RefreshCw size={16} />
              </Button>
            </div>
            
            {/* Message Content Area */}
            {viewMode === 'message' && selectedMessage ? (
              <div className="flex-1 overflow-auto p-6">
                <div className="mb-4 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedMessage(null);
                      setViewMode('inbox');
                    }}
                    className="mr-2"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  
                  <div className="ml-auto flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStar(selectedMessage.id)}
                    >
                      {selectedMessage.starred ? (
                        <StarOff size={16} className="text-yellow-500" />
                      ) : (
                        <Star size={16} />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedMessage.subject}
                  </h2>
                  
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
                      <User size={20} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedMessage.sender.id === 'user1' 
                              ? `To: ${selectedMessage.recipient.name}`
                              : `From: ${selectedMessage.sender.name}`
                            }
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedMessage.sender.role}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {formatMessageDate(selectedMessage.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line mb-6">
                    {selectedMessage.content}
                  </div>
                  
                  {selectedMessage.attachments.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Attachments ({selectedMessage.attachments.length})
                      </h3>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map(attachment => (
                          <div 
                            key={attachment.id} 
                            className="flex items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md"
                          >
                            <div className="p-2 rounded-md bg-white dark:bg-gray-800 mr-3">
                              {attachment.type === 'image' ? (
                                <ImageIcon size={20} className="text-blue-500" />
                              ) : (
                                <File size={20} className="text-red-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {attachment.size}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <a href={attachment.url} download className="flex items-center">
                                Download
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reply
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                      <Textarea 
                        placeholder="Type your reply here..." 
                        className="mb-4 bg-white dark:bg-gray-800"
                        rows={4}
                      />
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          <Paperclip size={14} className="mr-2" />
                          Attach
                        </Button>
                        <Button>
                          <Send size={14} className="mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className="flex-1 flex items-center justify-center">
                <RefreshCw size={24} className="animate-spin text-primary" />
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Mail size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'No messages match your search' : 'No messages found'}
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <div>
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer p-4 ${
                        !message.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                      }`}
                      onClick={() => handleSelectMessage(message)}
                    >
                      <div className="flex-shrink-0 mr-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <User size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <button 
                          className="mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStar(message.id);
                          }}
                        >
                          {message.starred ? (
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          ) : (
                            <Star size={16} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className={`text-sm font-medium truncate ${
                            !message.read 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {message.sender.id === 'user1' 
                              ? `To: ${message.recipient.name}`
                              : `From: ${message.sender.name}`
                            }
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                            {formatMessageDate(message.timestamp)}
                          </span>
                        </div>
                        
                        <p className={`text-sm truncate mb-1 ${
                          !message.read 
                            ? 'text-gray-800 dark:text-gray-200 font-medium' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {message.subject}
                        </p>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {message.content}
                        </p>
                        
                        {message.attachments.length > 0 && (
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <Paperclip size={12} className="mr-1" />
                            {message.attachments.length} attachment{message.attachments.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0 ml-4 self-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectMessage(message);
                              }}
                            >
                              View
                            </DropdownMenuItem>
                            {!message.read && (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedMessages = messages.map(msg => 
                                    msg.id === message.id ? { ...msg, read: true } : msg
                                  );
                                  setMessages(updatedMessages);
                                  filterMessages(updatedMessages, viewMode, searchTerm);
                                }}
                              >
                                Mark as Read
                              </DropdownMenuItem>
                            )}
                            {message.read && (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedMessages = messages.map(msg => 
                                    msg.id === message.id ? { ...msg, read: false } : msg
                                  );
                                  setMessages(updatedMessages);
                                  filterMessages(updatedMessages, viewMode, searchTerm);
                                }}
                              >
                                Mark as Unread
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStar(message.id);
                              }}
                            >
                              {message.starred ? 'Remove Star' : 'Star Message'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteMessage(message.id);
                              }}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Message Modal */}
      <Dialog open={showComposeModal} onOpenChange={setShowComposeModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose New Message</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSendMessage}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">To</Label>
                <Select
                  value={newMessage.recipient}
                  onValueChange={(value) => setNewMessage({...newMessage, recipient: value})}
                >
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.filter(u => u.id !== 'user1').map(u => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name} ({u.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex items-center">
                <Button variant="outline" type="button" className="mr-2">
                  <Paperclip size={16} className="mr-2" />
                  Attach File
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowComposeModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Send size={16} className="mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesPanel; 