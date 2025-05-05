import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { userApi, UserData } from '../../utils/api';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Search, 
  ChevronDown, 
  RefreshCw,
  User, 
  UserCheck,
  Shield,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';

// User role icon mapping
const RoleIcon = ({ role }: { role?: string }) => {
  switch (role) {
    case 'admin':
      return <Shield size={16} className="text-red-500" />;
    case 'teacher':
      return <UserCheck size={16} className="text-blue-500" />;
    case 'staff':
      return <User size={16} className="text-green-500" />;
    default:
      return <User size={16} className="text-gray-500" />;
  }
};

// Define role options and their display properties
const roleOptions = [
  { value: 'admin', label: 'Administrator', description: 'Full system access' },
  { value: 'teacher', label: 'Teacher', description: 'Manage classes and content' },
  { value: 'staff', label: 'Staff', description: 'Limited system access' }
];

// Department options
const departmentOptions = [
  'Administration',
  'Science',
  'Mathematics',
  'English',
  'Social Studies',
  'Physical Education',
  'Arts',
  'Language',
  'Computer Science',
  'Special Education'
];

const UserManagement: React.FC = () => {
  const { user, createNewUser } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [sortBy, setSortBy] = useState<'displayName' | 'email' | 'role'>('displayName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [newUser, setNewUser] = useState({
    displayName: '',
    email: '',
    password: '',
    role: 'staff',
    department: '',
    position: '',
    phoneNumber: ''
  });

  const [editUserData, setEditUserData] = useState({
    displayName: '',
    email: '',
    role: '',
    department: '',
    position: '',
    phoneNumber: ''
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getUsers();

      // Make sure we have a valid response with data
      if (response && response.data) {
        setUsers(Array.isArray(response.data) ? response.data : []);
      } else {
        console.warn('Received invalid user data format:', response);
        setUsers([]);
        setError('Received invalid data format from server');
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      const errorMessage = error.message || 'Failed to fetch users';
      setError(errorMessage);
      toast.error(errorMessage);
      setUsers([]); // Reset users to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSort = (field: 'displayName' | 'email' | 'role') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    // Handle null/undefined values safely
    const valueA = a[sortBy]?.toString().toLowerCase() || '';
    const valueB = b[sortBy]?.toString().toLowerCase() || '';

    if (sortDirection === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  const filteredUsers = sortedUsers.filter(user =>
    (user.displayName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.role?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.department?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setNewUser({
      displayName: '',
      email: '',
      password: '',
      role: 'staff',
      department: '',
      position: '',
      phoneNumber: ''
    });
    setShowAddUserModal(true);
  };

  const handleEditUser = (user: UserData) => {
    setEditUserData({
      displayName: user.displayName || '',
      email: user.email || '',
      role: user.role || '',
      department: user.department || '',
      position: user.position || '',
      phoneNumber: user.phoneNumber || ''
    });
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userApi.deleteUser(userId);
      toast.success('User deleted successfully');
      // Refresh the user list
      fetchUsers();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to delete user';
      toast.error(errorMessage);
    }
  };

  const handleNewUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!newUser.displayName.trim()) {
        throw new Error('Display name is required');
      }
      
      if (!newUser.email.trim()) {
        throw new Error('Email is required');
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newUser.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Password validation
      if (!newUser.password || newUser.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if email already exists in the current users list
      const emailExists = users.some(user => 
        user.email.toLowerCase() === newUser.email.toLowerCase()
      );
      
      if (emailExists) {
        throw new Error('A user with this email already exists');
      }
      
      // Generate a unique userId
      const uniqueId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      // Cast role to the correct type and add userId
      await createNewUser({
        displayName: newUser.displayName,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role as 'admin' | 'teacher' | 'staff',
        department: newUser.department,
        position: newUser.position,
        phoneNumber: newUser.phoneNumber,
        userId: uniqueId
      });
      
      toast.success('User created successfully');
      setShowAddUserModal(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser?._id) return;
    setIsSubmitting(true);

    try {
      // Create a properly typed object for the update
      const updateData = {
        displayName: editUserData.displayName,
        email: editUserData.email,
        role: editUserData.role as 'admin' | 'teacher' | 'staff',
        department: editUserData.department,
        position: editUserData.position,
        phoneNumber: editUserData.phoneNumber
      };
      
      await userApi.updateUser(selectedUser._id, updateData);
      toast.success('User updated successfully');
      setShowEditUserModal(false);
      fetchUsers();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update user';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage system users and their permissions
          </p>
        </div>

        {user?.role === 'admin' && (
          <Button
            className="mt-4 md:mt-0 flex items-center"
            onClick={handleAddUser}
          >
            <UserPlus size={18} className="mr-2" />
            Add User
          </Button>
        )}
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

            <Input
              type="text"
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            className="flex items-center"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <RefreshCw size={24} className="animate-spin text-primary" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {searchTerm ? 'No users match your search' : 'No users found'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('displayName')}>
                    <button className="flex items-center font-semibold">
                      Name
                      {sortBy === 'displayName' && (
                        <ChevronDown size={14} className={`ml-1 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('email')}>
                    <button className="flex items-center font-semibold">
                      Email
                      {sortBy === 'email' && (
                        <ChevronDown size={14} className={`ml-1 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('role')}>
                    <button className="flex items-center font-semibold">
                      Role
                      {sortBy === 'role' && (
                        <ChevronDown size={14} className={`ml-1 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">Department</th>
                  {user?.role === 'admin' && (
                    <th className="px-6 py-3 text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {user.displayName || 'Unnamed User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {user.email || 'No Email'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <RoleIcon role={user.role} />
                        <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                          {user.role || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {user.department || '-'}
                    </td>
                    {user?.role === 'admin' && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user._id || '')}
                            className="text-gray-600 hover:text-red-600 dark:text-gray-300"
                            disabled={user.role === 'admin'} // Prevent deleting admin users
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleNewUserSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newUser.displayName}
                  onChange={(e) => setNewUser({...newUser, displayName: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                  minLength={6}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center">
                          <RoleIcon role={role.value} />
                          <span className="ml-2">{role.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select 
                  value={newUser.department} 
                  onValueChange={(value) => setNewUser({...newUser, department: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  id="position"
                  className="col-span-3"
                  value={newUser.position}
                  onChange={(e) => setNewUser({...newUser, position: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  className="col-span-3"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAddUserModal(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditUserModal} onOpenChange={setShowEditUserModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleEditUserSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={editUserData.displayName}
                  onChange={(e) => setEditUserData({...editUserData, displayName: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  className="col-span-3"
                  value={editUserData.email}
                  onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select 
                  value={editUserData.role} 
                  onValueChange={(value) => setEditUserData({...editUserData, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center">
                          <RoleIcon role={role.value} />
                          <span className="ml-2">{role.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">
                  Department
                </Label>
                <Select 
                  value={editUserData.department} 
                  onValueChange={(value) => setEditUserData({...editUserData, department: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-position" className="text-right">
                  Position
                </Label>
                <Input
                  id="edit-position"
                  className="col-span-3"
                  value={editUserData.position}
                  onChange={(e) => setEditUserData({...editUserData, position: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  className="col-span-3"
                  value={editUserData.phoneNumber}
                  onChange={(e) => setEditUserData({...editUserData, phoneNumber: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowEditUserModal(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update User'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;