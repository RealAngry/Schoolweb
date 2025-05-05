import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  GraduationCap,
  Filter,
  Download,
  FileText,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Label } from '../ui/label';
import { useAuth } from '../../context/AuthContext';
import { EmptyState } from '../ui/empty-state';
import { useToast } from '../ui/use-toast';
import { studentApi, exportApi } from '../../utils/api';

// Student data interface
interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  gender: string;
  fatherName: string;
  motherName: string;
  contactNo: string;
  email: string;
  address: string;
  joiningDate: string;
  status: 'active' | 'inactive';
}

const StudentManagement: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // New student form state
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: 'Class 1',
    section: 'A',
    rollNo: '',
    gender: 'Male',
    fatherName: '',
    motherName: '',
    contactNo: '',
    email: '',
    address: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Fetch students (real data from API)
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use real API call
      const data = await studentApi.getStudents();
      setStudents(data.students || []);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setError('Failed to load students. Please try again.');
      // Use mock data as fallback when API fails
      const mockData = generateMockStudents();
      setStudents(mockData);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Filter students based on search term and class filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    
    return matchesSearch && matchesClass;
  });

  // Get unique class names for filter dropdown
  const classes = ['all', ...new Set(students.map(student => student.class))];

  // Handle adding a new student
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Form validation
      if (!newStudent.name || !newStudent.rollNo) {
        throw new Error('Please fill all required fields');
      }
      
      // Create student via API
      const response = await studentApi.createStudent({
        ...newStudent,
        joiningDate: new Date().toISOString().split('T')[0]
      });
      
      // Update local state with the new student
      setStudents([...students, response.student]);
      setShowAddModal(false);
      
      // Clear form
      setNewStudent({
        name: '',
        class: 'Class 1',
        section: 'A',
        rollNo: '',
        gender: 'Male',
        fatherName: '',
        motherName: '',
        contactNo: '',
        email: '',
        address: '',
        status: 'active'
      });
      
      toast({
        title: "Success",
        description: "Student added successfully",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Error adding student:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add student. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle editing a student
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setNewStudent({
      name: student.name,
      class: student.class,
      section: student.section,
      rollNo: student.rollNo,
      gender: student.gender,
      fatherName: student.fatherName,
      motherName: student.motherName,
      contactNo: student.contactNo,
      email: student.email,
      address: student.address,
      status: student.status
    });
    setShowEditModal(true);
  };
  
  // Handle updating student information
  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) return;
    setIsSubmitting(true);
    
    try {
      // Form validation
      if (!newStudent.name || !newStudent.rollNo) {
        throw new Error('Please fill all required fields');
      }
      
      // Update student via API
      const response = await studentApi.updateStudent(selectedStudent.id, newStudent);
      
      // Update local state
      const updatedStudents = students.map(student => 
        student.id === selectedStudent.id ? { ...student, ...response.student } : student
      );
      
      setStudents(updatedStudents);
      setShowEditModal(false);
      setSelectedStudent(null);
      
      toast({
        title: "Success",
        description: "Student updated successfully",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Error updating student:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update student. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle viewing a student
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Handle deleting a student
  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      try {
        // Delete student via API
        await studentApi.deleteStudent(id);
        
        // Update local state
        setStudents(students.filter(student => student.id !== id));
        
        toast({
          title: "Success",
          description: "Student deleted successfully",
          variant: "default",
        });
      } catch (error: any) {
        console.error('Error deleting student:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to delete student. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Handle exporting student data
  const handleExportData = async (format: 'pdf' | 'excel' = 'pdf') => {
    try {
      // Export data based on current filters
      const filters = {
        classFilter: classFilter !== 'all' ? classFilter : undefined,
        searchTerm: searchTerm || undefined
      };
      
      // Call the export API
      const blob = await exportApi.exportStudentData(
        selectedStudent?.id || 'all', 
        format
      );
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `student-data-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
      
      toast({
        title: "Success",
        description: `Data exported successfully as ${format.toUpperCase()}`,
        variant: "default",
      });
    } catch (error: any) {
      console.error('Error exporting data:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to export data as ${format.toUpperCase()}`,
        variant: "destructive",
      });
    }
  };
  
  // Generate mock students data if needed
  const generateMockStudents = (): Student[] => {
    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
                    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 
                    'Class 11', 'Class 12'];
    const sections = ['A', 'B', 'C'];
    const statuses = ['active', 'inactive'] as const;
    
    return Array.from({ length: 25 }, (_, i) => {
      const className = classes[Math.floor(Math.random() * classes.length)];
      const sectionName = sections[Math.floor(Math.random() * sections.length)];
      
      return {
        id: `STU${(i + 1).toString().padStart(4, '0')}`,
        name: `Student ${i + 1}`,
        class: className,
        section: sectionName,
        rollNo: (Math.floor(Math.random() * 50) + 1).toString(),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        fatherName: `Father of Student ${i + 1}`,
        motherName: `Mother of Student ${i + 1}`,
        contactNo: `+91 98765${Math.floor(10000 + Math.random() * 90000)}`,
        email: `student${i + 1}@example.com`,
        address: `Address of Student ${i + 1}, City, State`,
        joiningDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toISOString().split('T')[0],
        status: statuses[Math.floor(Math.random() * 2)]
      };
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage student information and records
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Student
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => handleExportData('pdf')}
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:items-end">
          <div className="flex-1">
            <Label htmlFor="search" className="text-sm font-medium mb-2">Search Students</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="search"
                placeholder="Search by name, ID, parent..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-48">
            <Label htmlFor="class-filter" className="text-sm font-medium mb-2">Filter by Class</Label>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger id="class-filter">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.filter(c => c !== 'all').map(className => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="icon" onClick={fetchStudents}>
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw size={24} className="animate-spin text-primary" />
          </div>
        ) : error ? (
          <EmptyState
            icon={<AlertTriangle size={50} />}
            title="Failed to load students"
            description={error}
            actionLabel="Try Again"
            onAction={fetchStudents}
          />
        ) : filteredStudents.length === 0 ? (
          <EmptyState
            icon={<GraduationCap size={50} />}
            title="No students found"
            description={searchTerm || classFilter !== 'all'
              ? 'No students match your search criteria. Try adjusting your filters.'
              : 'There are no students in the system yet.'}
            actionLabel="Add New Student"
            actionIcon={<UserPlus size={16} />}
            onAction={() => setShowAddModal(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Class</th>
                  <th className="px-6 py-3 text-left">Roll No</th>
                  <th className="px-6 py-3 text-left">Father's Name</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {student.class} - {student.section}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {student.fatherName}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewStudent(student)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-gray-600 hover:text-red-600 dark:text-gray-400"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddStudent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={newStudent.class}
                    onValueChange={(value) => setNewStudent({...newStudent, class: value})}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.filter(c => c !== 'all').map(className => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select
                    value={newStudent.section}
                    onValueChange={(value) => setNewStudent({...newStudent, section: value})}
                  >
                    <SelectTrigger id="section">
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roll-no">Roll Number</Label>
                <Input
                  id="roll-no"
                  value={newStudent.rollNo}
                  onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={newStudent.gender}
                  onValueChange={(value) => setNewStudent({...newStudent, gender: value})}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="father-name">Father's Name</Label>
                <Input
                  id="father-name"
                  value={newStudent.fatherName}
                  onChange={(e) => setNewStudent({...newStudent, fatherName: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mother-name">Mother's Name</Label>
                <Input
                  id="mother-name"
                  value={newStudent.motherName}
                  onChange={(e) => setNewStudent({...newStudent, motherName: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={newStudent.contactNo}
                  onChange={(e) => setNewStudent({...newStudent, contactNo: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newStudent.status}
                  onValueChange={(value) => setNewStudent({...newStudent, status: value as 'active' | 'inactive'})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Student'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Student Modal */}
      {selectedStudent && (
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedStudent.name}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedStudent.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Student ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Class & Section</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedStudent.class} - {selectedStudent.section}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.rollNo}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.gender}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Father's Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.fatherName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mother's Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.motherName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.contactNo}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.email || '-'}</p>
                </div>
                
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Joining Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.joiningDate}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleExportData('pdf')}
                className="flex items-center"
              >
                <FileText size={16} className="mr-2" />
                Export PDF
              </Button>
              
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setShowViewModal(false)}>Close</Button>
                <Button onClick={() => {
                  setShowViewModal(false);
                  handleEditStudent(selectedStudent);
                }}>Edit Student</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Student Modal */}
      {selectedStudent && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleUpdateStudent}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-class">Class</Label>
                    <Select
                      value={newStudent.class}
                      onValueChange={(value) => setNewStudent({...newStudent, class: value})}
                    >
                      <SelectTrigger id="edit-class">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.filter(c => c !== 'all').map(className => (
                          <SelectItem key={className} value={className}>
                            {className}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-section">Section</Label>
                    <Select
                      value={newStudent.section}
                      onValueChange={(value) => setNewStudent({...newStudent, section: value})}
                    >
                      <SelectTrigger id="edit-section">
                        <SelectValue placeholder="Section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Additional fields (similar to add form) */}
                <div className="space-y-2">
                  <Label htmlFor="edit-roll-no">Roll Number</Label>
                  <Input
                    id="edit-roll-no"
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={newStudent.gender}
                    onValueChange={(value) => setNewStudent({...newStudent, gender: value})}
                  >
                    <SelectTrigger id="edit-gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-father-name">Father's Name</Label>
                  <Input
                    id="edit-father-name"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({...newStudent, fatherName: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-mother-name">Mother's Name</Label>
                  <Input
                    id="edit-mother-name"
                    value={newStudent.motherName}
                    onChange={(e) => setNewStudent({...newStudent, motherName: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-contact">Contact Number</Label>
                  <Input
                    id="edit-contact"
                    value={newStudent.contactNo}
                    onChange={(e) => setNewStudent({...newStudent, contactNo: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="edit-address">Full Address</Label>
                  <Input
                    id="edit-address"
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={newStudent.status}
                    onValueChange={(value) => setNewStudent({...newStudent, status: value as 'active' | 'inactive'})}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Student'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentManagement; 