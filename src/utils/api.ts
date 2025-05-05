import axios from 'axios';

// Types
export interface UserData {
  _id: string;
  userId?: string;
  displayName: string;
  email: string;
  role: 'admin' | 'teacher' | 'staff';
  department?: string;
  position?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  user: UserData;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle expired tokens or authentication issues
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: {
    displayName: string;
    email: string;
    password: string;
    role: string;
    userId?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error('Token invalid or expired');
    }
  }
};

// Student API
export const studentApi = {
  getStudents: async () => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  getStudentById: async (id: string) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student with ID ${id}:`, error);
      throw error;
    }
  },
  
  createStudent: async (studentData: any) => {
    try {
      const response = await api.post('/students', studentData);
      return response.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },
  
  updateStudent: async (id: string, studentData: any) => {
    try {
      const response = await api.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating student with ID ${id}:`, error);
      throw error;
    }
  },
  
  deleteStudent: async (id: string) => {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting student with ID ${id}:`, error);
      throw error;
    }
  }
};

// User Management API
export const userApi = {
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  getUserById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },
  
  createUser: async (userData: any) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  updateUser: async (id: string, userData: any) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },
  
  deleteUser: async (id: string) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }
};

// Export API
export const exportApi = {
  exportStudentData: async (id: string, format: 'pdf' | 'excel' = 'pdf') => {
    try {
      const response = await api.get(`/export/students/${id}?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error(`Error exporting student data:`, error);
      throw error;
    }
  },
  
  exportReportData: async (reportType: string, filters: any, format: 'pdf' | 'excel' = 'pdf') => {
    try {
      const response = await api.post(`/export/reports/${reportType}?format=${format}`, filters, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error(`Error exporting report data:`, error);
      throw error;
    }
  }
};

// Attendance API
export const attendanceApi = {
  getAttendance: async (classId: string, date: string) => {
    try {
      const response = await api.get(`/attendance/${classId}?date=${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }
  },
  
  markAttendance: async (data: { classId: string, date: string, records: any[] }) => {
    try {
      const response = await api.post('/attendance', data);
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw error;
    }
  },
  
  getStudentAttendance: async (studentId: string, month: string, year: string) => {
    try {
      const response = await api.get(`/attendance/student/${studentId}?month=${month}&year=${year}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance for student ${studentId}:`, error);
      throw error;
    }
  }
};

// Marks API
export const marksApi = {
  getMarks: async (classId: string, examId: string) => {
    try {
      const response = await api.get(`/marks/${classId}/${examId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching marks:', error);
      throw error;
    }
  },
  
  submitMarks: async (data: { classId: string, examId: string, marks: any[] }) => {
    try {
      const response = await api.post('/marks', data);
      return response.data;
    } catch (error) {
      console.error('Error submitting marks:', error);
      throw error;
    }
  },
  
  getStudentMarks: async (studentId: string, year: string) => {
    try {
      const response = await api.get(`/marks/student/${studentId}?year=${year}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching marks for student ${studentId}:`, error);
      throw error;
    }
  }
};

export default api; 