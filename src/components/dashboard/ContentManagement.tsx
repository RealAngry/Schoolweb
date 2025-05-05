import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  FileUp, 
  Eye,
  FolderOpen,
  RefreshCw,
  Clock,
  Filter,
  Tag,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../ui/use-toast';

// Define content types
interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'post' | 'document' | 'course';
  status: 'published' | 'draft' | 'archived';
  author: string;
  category: string;
  tags: string[];
  lastModified: Date;
  createdAt: Date;
  description?: string;
  content?: string;
  thumbnail?: string;
}

// Generate mock content
const generateMockContent = (): ContentItem[] => {
  const contentItems: ContentItem[] = [];
  const now = new Date();
  
  // Page examples
  contentItems.push({
    id: 'page-1',
    title: 'About Us',
    type: 'page',
    status: 'published',
    author: 'Admin User',
    category: 'Information',
    tags: ['school', 'about'],
    lastModified: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    description: 'Information about our school and history'
  });
  
  contentItems.push({
    id: 'page-2',
    title: 'Contact Us',
    type: 'page',
    status: 'published',
    author: 'Admin User',
    category: 'Information',
    tags: ['contact', 'location'],
    lastModified: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    description: 'Contact information and form'
  });
  
  // Post examples
  contentItems.push({
    id: 'post-1',
    title: 'Annual Sports Day Announcement',
    type: 'post',
    status: 'published',
    author: 'John Teacher',
    category: 'Events',
    tags: ['sports', 'events', 'announcement'],
    lastModified: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    description: 'Information about upcoming annual sports day'
  });
  
  contentItems.push({
    id: 'post-2',
    title: 'Science Fair Results',
    type: 'post',
    status: 'draft',
    author: 'Sarah Teacher',
    category: 'News',
    tags: ['science', 'competition', 'results'],
    lastModified: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    description: 'Results of the annual science fair'
  });
  
  // Document examples
  contentItems.push({
    id: 'doc-1',
    title: 'School Calendar 2023-2024',
    type: 'document',
    status: 'published',
    author: 'Admin User',
    category: 'Academic',
    tags: ['calendar', 'schedule'],
    lastModified: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
    description: 'Official school calendar for the academic year'
  });
  
  contentItems.push({
    id: 'doc-2',
    title: 'Parent-Teacher Meeting Guidelines',
    type: 'document',
    status: 'published',
    author: 'Admin User',
    category: 'Administrative',
    tags: ['parents', 'meetings', 'guidelines'],
    lastModified: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
    description: 'Guidelines for parent-teacher meetings'
  });
  
  // Course examples
  contentItems.push({
    id: 'course-1',
    title: 'Introduction to Biology',
    type: 'course',
    status: 'published',
    author: 'Sarah Teacher',
    category: 'Science',
    tags: ['biology', 'science', 'grade-9'],
    lastModified: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
    description: 'Basic concepts of biology for Grade 9 students'
  });
  
  contentItems.push({
    id: 'course-2',
    title: 'Advanced Mathematics',
    type: 'course',
    status: 'archived',
    author: 'John Teacher',
    category: 'Mathematics',
    tags: ['math', 'advanced', 'grade-11'],
    lastModified: new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000),
    createdAt: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000),
    description: 'Advanced mathematics topics for Grade 11'
  });
  
  return contentItems;
};

// Format date helper
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const ContentManagement: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const canEdit = isAdmin || isTeacher;
  
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
  
  // New content form state
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({
    title: '',
    type: 'page',
    status: 'draft',
    category: '',
    tags: [],
    description: '',
    content: ''
  });
  
  // Load content (mock)
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const mockData = generateMockContent();
      setContentItems(mockData);
      setFilteredItems(mockData);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter content when search or filters change
  useEffect(() => {
    let filtered = [...contentItems];
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }
    
    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    
    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedType, selectedStatus, contentItems]);
  
  // Handle edit
  const handleEditItem = (item: ContentItem) => {
    setCurrentItem(item);
    setNewContent({
      title: item.title,
      type: item.type,
      status: item.status,
      category: item.category,
      tags: item.tags,
      description: item.description,
      content: item.content
    });
    setShowEditModal(true);
  };
  
  // Handle view
  const handleViewItem = (item: ContentItem) => {
    setCurrentItem(item);
    setShowViewModal(true);
  };
  
  // Handle delete
  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      const updatedItems = contentItems.filter(item => item.id !== id);
      setContentItems(updatedItems);
      toast({
        title: "Content Deleted",
        description: "Content has been successfully deleted.",
        duration: 3000,
      });
    }
  };
  
  // Handle save new content
  const handleSaveNewContent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newContent.title || !newContent.type || !newContent.status) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const now = new Date();
    const newItem: ContentItem = {
      id: `${newContent.type}-${Date.now()}`,
      title: newContent.title!,
      type: newContent.type as 'page' | 'post' | 'document' | 'course',
      status: newContent.status as 'published' | 'draft' | 'archived',
      author: user?.displayName || 'Unknown User',
      category: newContent.category || 'Uncategorized',
      tags: newContent.tags || [],
      lastModified: now,
      createdAt: now,
      description: newContent.description,
      content: newContent.content
    };
    
    setContentItems([newItem, ...contentItems]);
    setShowAddModal(false);
    
    // Reset form
    setNewContent({
      title: '',
      type: 'page',
      status: 'draft',
      category: '',
      tags: [],
      description: '',
      content: ''
    });
    
    toast({
      title: "Content Created",
      description: "New content has been successfully created.",
      duration: 3000,
    });
  };
  
  // Handle update content
  const handleUpdateContent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentItem) return;
    if (!newContent.title || !newContent.type || !newContent.status) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const updatedItem: ContentItem = {
      ...currentItem,
      title: newContent.title,
      type: newContent.type as 'page' | 'post' | 'document' | 'course',
      status: newContent.status as 'published' | 'draft' | 'archived',
      category: newContent.category || 'Uncategorized',
      tags: newContent.tags || [],
      lastModified: new Date(),
      description: newContent.description,
      content: newContent.content
    };
    
    const updatedItems = contentItems.map(item => 
      item.id === currentItem.id ? updatedItem : item
    );
    
    setContentItems(updatedItems);
    setShowEditModal(false);
    setCurrentItem(null);
    
    toast({
      title: "Content Updated",
      description: "Content has been successfully updated.",
      duration: 3000,
    });
  };
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge variant="success">Published</Badge>;
      case 'draft': return <Badge variant="secondary">Draft</Badge>;
      case 'archived': return <Badge variant="outline">Archived</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };
  
  // Get content type badge variant
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'page': return <Badge variant="default">Page</Badge>;
      case 'post': return <Badge variant="primary">Post</Badge>;
      case 'document': return <Badge variant="warning">Document</Badge>;
      case 'course': return <Badge variant="info">Course</Badge>;
      default: return <Badge>{type}</Badge>;
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage website content, documents, and courses
          </p>
        </div>
        
        {canEdit && (
          <Button
            onClick={() => setShowAddModal(true)}
            className="mt-4 md:mt-0"
          >
            <Plus size={16} className="mr-2" />
            Add New Content
          </Button>
        )}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search content..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="page">Pages</SelectItem>
              <SelectItem value="post">Posts</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="course">Courses</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw size={24} className="animate-spin text-primary" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <FileText size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                ? 'No content matches your filters'
                : 'No content items found'}
            </p>
            {canEdit && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} className="mr-2" />
                Create New Content
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Author</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Modified</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[250px]">
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {getTypeBadge(item.type)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {item.author}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        <span>{formatDate(item.lastModified)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewItem(item)}
                        >
                          <Eye size={16} />
                        </Button>
                        
                        {canEdit && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditItem(item)}
                            >
                              <Edit size={16} />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Content Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSaveNewContent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newContent.title}
                  onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Content Type</Label>
                <Select
                  value={newContent.type}
                  onValueChange={(value) => setNewContent({...newContent, type: value as any})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="post">Post</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newContent.category}
                  onChange={(e) => setNewContent({...newContent, category: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newContent.status}
                  onValueChange={(value) => setNewContent({...newContent, status: value as any})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newContent.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewContent({...newContent, description: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newContent.content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewContent({...newContent, content: e.target.value})}
                  rows={8}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Content</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Content Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpdateContent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={newContent.title}
                  onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-type">Content Type</Label>
                <Select
                  value={newContent.type}
                  onValueChange={(value) => setNewContent({...newContent, type: value as any})}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="post">Post</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={newContent.category}
                  onChange={(e) => setNewContent({...newContent, category: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={newContent.status}
                  onValueChange={(value) => setNewContent({...newContent, status: value as any})}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={newContent.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewContent({...newContent, description: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={newContent.content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewContent({...newContent, content: e.target.value})}
                  rows={8}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Content</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Content Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentItem?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              {currentItem && getTypeBadge(currentItem.type)}
              {currentItem && getStatusBadge(currentItem.status)}
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                {currentItem?.category}
              </Badge>
            </div>
            
            {currentItem?.description && (
              <div className="mb-4 text-gray-600 dark:text-gray-300 italic">
                {currentItem.description}
              </div>
            )}
            
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-4">
              <div className="prose dark:prose-invert max-w-none">
                {currentItem?.content || (
                  <p className="text-gray-500 dark:text-gray-400 italic">No content available</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span>Author: {currentItem?.author}</span>
                <span>Created: {currentItem && formatDate(currentItem.createdAt)}</span>
                <span>Last modified: {currentItem && formatDate(currentItem.lastModified)}</span>
              </div>
              
              {currentItem?.tags && currentItem.tags.length > 0 && (
                <div className="flex items-center mt-2 md:mt-0">
                  <Tag size={14} className="mr-2" />
                  {currentItem.tags.map((tag, index) => (
                    <span key={index} className="mr-2">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            {canEdit && currentItem && (
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => {
                  setShowViewModal(false);
                  handleEditItem(currentItem);
                }}
              >
                <Edit size={16} className="mr-2" />
                Edit Content
              </Button>
            )}
            <Button onClick={() => setShowViewModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement; 