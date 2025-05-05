import React, { useState } from 'react';
import { Mail, Phone, Search } from 'lucide-react';

interface FacultyMember {
  id: number;
  name: string;
  position: string;
  department: string;
  qualifications: string;
  experience: string;
  image: string;
  email: string;
  phone: string;
}

const FacultyPage: React.FC = () => {
  // Sample faculty data
  const facultyMembers: FacultyMember[] = [
    {
      id: 1,
      name: 'Dr. Amit Verma',
      position: 'Head of Science Department',
      department: 'Science',
      qualifications: 'Ph.D. in Physics, IIT Delhi',
      experience: '15 years',
      image: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg',
      email: 'amit.verma@hmpsazamgarh.org',
      phone: '+91 9876543210',
    },
    {
      id: 2,
      name: 'Mrs. Sunita Sharma',
      position: 'Senior Mathematics Teacher',
      department: 'Mathematics',
      qualifications: 'M.Sc. in Mathematics, Banaras Hindu University',
      experience: '12 years',
      image: 'https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg',
      email: 'sunita.sharma@hmpsazamgarh.org',
      phone: '+91 9876543211',
    },
    {
      id: 3,
      name: 'Mr. Rajesh Patel',
      position: 'English Faculty',
      department: 'Languages',
      qualifications: 'M.A. in English Literature, Delhi University',
      experience: '10 years',
      image: 'https://images.pexels.com/photos/5905469/pexels-photo-5905469.jpeg',
      email: 'rajesh.patel@hmpsazamgarh.org',
      phone: '+91 9876543212',
    },
    {
      id: 4,
      name: 'Dr. Priya Gupta',
      position: 'Head of Social Sciences',
      department: 'Social Sciences',
      qualifications: 'Ph.D. in History, Allahabad University',
      experience: '14 years',
      image: 'https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg',
      email: 'priya.gupta@hmpsazamgarh.org',
      phone: '+91 9876543213',
    },
    {
      id: 5,
      name: 'Mr. Sanjay Kumar',
      position: 'Computer Science Teacher',
      department: 'Computer Science',
      qualifications: 'M.Tech in Computer Science, IIT Kanpur',
      experience: '8 years',
      image: 'https://images.pexels.com/photos/8197534/pexels-photo-8197534.jpeg',
      email: 'sanjay.kumar@hmpsazamgarh.org',
      phone: '+91 9876543214',
    },
    {
      id: 6,
      name: 'Mrs. Neha Singh',
      position: 'Hindi Teacher',
      department: 'Languages',
      qualifications: 'M.A. in Hindi, Lucknow University',
      experience: '9 years',
      image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg',
      email: 'neha.singh@hmpsazamgarh.org',
      phone: '+91 9876543215',
    },
    {
      id: 7,
      name: 'Dr. Vikram Yadav',
      position: 'Chemistry Teacher',
      department: 'Science',
      qualifications: 'Ph.D. in Chemistry, BHU',
      experience: '11 years',
      image: 'https://images.pexels.com/photos/8402298/pexels-photo-8402298.jpeg',
      email: 'vikram.yadav@hmpsazamgarh.org',
      phone: '+91 9876543216',
    },
    {
      id: 8,
      name: 'Ms. Aarti Patel',
      position: 'Physical Education Instructor',
      department: 'Physical Education',
      qualifications: 'M.P.Ed, Lakshmibai National Institute of Physical Education',
      experience: '7 years',
      image: 'https://images.pexels.com/photos/3228895/pexels-photo-3228895.jpeg',
      email: 'aarti.patel@hmpsazamgarh.org',
      phone: '+91 9876543217',
    },
    {
      id: 9,
      name: 'Mr. Rahul Mehra',
      position: 'Biology Teacher',
      department: 'Science',
      qualifications: 'M.Sc. in Biotechnology, Aligarh Muslim University',
      experience: '6 years',
      image: 'https://images.pexels.com/photos/8405822/pexels-photo-8405822.jpeg',
      email: 'rahul.mehra@hmpsazamgarh.org',
      phone: '+91 9876543218',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  const departments = ['All Departments', 'Science', 'Mathematics', 'Languages', 'Social Sciences', 'Computer Science', 'Physical Education'];
  
  const filteredFaculty = facultyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === '' || 
                             selectedDepartment === 'All Departments' || 
                             member.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Faculty</h1>
            <p className="text-lg opacity-90">
              Meet our dedicated team of educators who are committed to excellence in teaching and student development.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name or position..."
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Department Filter */}
                <div>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFaculty.map((faculty) => (
                <div key={faculty.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full mb-3">
                      {faculty.department}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{faculty.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{faculty.position}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><strong>Qualifications:</strong> {faculty.qualifications}</p>
                      <p><strong>Experience:</strong> {faculty.experience}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-500 mr-2" />
                        <a href={`mailto:${faculty.email}`} className="text-primary-600 hover:underline">
                          {faculty.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-500 mr-2" />
                        <a href={`tel:${faculty.phone}`} className="text-primary-600 hover:underline">
                          {faculty.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No faculty members found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filter selection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Department Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Departments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Department 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Science Department</h3>
              <p className="text-gray-600 mb-4">
                Our science department comprises specialized educators in Physics, Chemistry, and Biology who 
                focus on both theoretical knowledge and practical laboratory skills.
              </p>
              <div className="text-sm text-gray-500">
                <p>Faculty Members: {facultyMembers.filter(f => f.department === 'Science').length}</p>
                <p>Head: Dr. Amit Verma</p>
              </div>
            </div>
            
            {/* Department 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Mathematics Department</h3>
              <p className="text-gray-600 mb-4">
                The mathematics department focuses on developing strong analytical and problem-solving skills 
                through engaging teaching methods and practical applications.
              </p>
              <div className="text-sm text-gray-500">
                <p>Faculty Members: {facultyMembers.filter(f => f.department === 'Mathematics').length}</p>
                <p>Head: Mrs. Sunita Sharma</p>
              </div>
            </div>
            
            {/* Department 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Languages Department</h3>
              <p className="text-gray-600 mb-4">
                Our languages department offers comprehensive instruction in Hindi, English, and Sanskrit, 
                emphasizing communication skills, literature appreciation, and cultural understanding.
              </p>
              <div className="text-sm text-gray-500">
                <p>Faculty Members: {facultyMembers.filter(f => f.department === 'Languages').length}</p>
                <p>Head: Mr. Rajesh Patel</p>
              </div>
            </div>
            
            {/* Department 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Social Sciences Department</h3>
              <p className="text-gray-600 mb-4">
                The social sciences department covers history, geography, civics, and economics, 
                providing students with a comprehensive understanding of human society and civilization.
              </p>
              <div className="text-sm text-gray-500">
                <p>Faculty Members: {facultyMembers.filter(f => f.department === 'Social Sciences').length}</p>
                <p>Head: Dr. Priya Gupta</p>
              </div>
            </div>
            
            {/* Department 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Computer Science Department</h3>
              <p className="text-gray-600 mb-4">
                Our computer science department equips students with both theoretical knowledge and 
                practical skills in programming, web development, and information technology.
              </p>
              <div className="text-sm text-gray-500">
                <p>Faculty Members: {facultyMembers.filter(f => f.department === 'Computer Science').length}</p>
                <p>Head: Mr. Sanjay Kumar</p>
              </div>
            </div>
            
            {/* Department 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Physical Education Department</h3>
              <p className="text-gray-600 mb-4">
                The physical education department promotes fitness, sportsmanship, and athletic skills 
                through a variety of sports activities and health education programs.
              </p>
              <div className="text-sm text-gray-500">
                <p>Faculty Members: {facultyMembers.filter(f => f.department === 'Physical Education').length}</p>
                <p>Head: Ms. Aarti Patel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Teaching Team</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            We're always looking for passionate educators to join our faculty. If you're interested in teaching opportunities, 
            please send your resume to careers@hmpsazamgarh.org.
          </p>
          <a 
            href="mailto:careers@hmpsazamgarh.org" 
            className="inline-block px-6 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;