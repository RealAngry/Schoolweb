import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Clock,
  ChevronRight
} from 'lucide-react';
import Button from '../components/Button';
import NewsCard from '../components/NewsCard';
import AnnouncementCard from '../components/AnnouncementCard';

const HomePage: React.FC = () => {
  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: 'Annual Sports Day Celebration',
      date: '2025-03-25',
      excerpt: 'Join us for the annual sports day celebration featuring various competitions and events.',
      image: 'https://images.pexels.com/photos/159745/school-active-education-teacher-159745.jpeg',
    },
    {
      id: 2,
      title: 'Science Exhibition Results',
      date: '2025-03-15',
      excerpt: 'Congratulations to all participants and winners of our Annual Science Exhibition.',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    },
    {
      id: 3,
      title: 'New Computer Lab Inauguration',
      date: '2025-03-05',
      excerpt: 'We are pleased to announce the inauguration of our state-of-the-art computer laboratory.',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    },
  ];

  // Sample announcements
  const announcements = [
    {
      id: 1,
      title: 'Admissions Open for 2025-26',
      date: '2025-03-20',
      content: 'Admissions are now open for the academic year 2025-26. Apply before April 30.',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: '2025-03-28',
      content: 'Parent-Teacher Meeting scheduled for all classes on March 28, 2025.',
    },
    {
      id: 3,
      title: 'Holiday Notice',
      date: '2025-04-01',
      content: 'The institution will remain closed on April 2-3, 2025 due to local festivals.',
    },
    {
      id: 4,
      title: 'Scholarship Test',
      date: '2025-04-10',
      content: 'Scholarship test for new and existing students will be held on April 10, 2025.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-800 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg" 
            alt="Campus" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Empowering Minds, Building Futures
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              HMPS Azamgarh provides quality education with a vision to create 
              responsible citizens and leaders of tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as={Link} to="/admission" variant="primary">
                Apply for Admission
              </Button>
              <Button as={Link} to="/about" variant="outline">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Banner */}
      <section className="bg-primary-600 dark:bg-primary-700 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Calendar className="text-white mr-3 flex-shrink-0" size={24} />
              <p className="text-white font-medium text-lg">Admissions Open for Academic Year 2025-26</p>
            </div>
            <Button as={Link} to="/admission" variant="outline-light" className="whitespace-nowrap">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-lg bg-primary-50">
              <div className="flex justify-center mb-3">
                <Calendar size={36} className="text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">70+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
            
            <div className="p-6 rounded-lg bg-primary-50">
              <div className="flex justify-center mb-3">
                <Users size={36} className="text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">2,500+</h3>
              <p className="text-gray-600">Students Enrolled</p>
            </div>
            
            <div className="p-6 rounded-lg bg-primary-50">
              <div className="flex justify-center mb-3">
                <Award size={36} className="text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">100+</h3>
              <p className="text-gray-600">Qualified Faculty</p>
            </div>
            
            <div className="p-6 rounded-lg bg-primary-50">
              <div className="flex justify-center mb-3">
                <BookOpen size={36} className="text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">15+</h3>
              <p className="text-gray-600">Programs Offered</p>
            </div>
          </div>
        </div>
      </section>

      {/* News and Announcements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
                <Link 
                  to="/news" 
                  className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map(news => (
                  <NewsCard 
                    key={news.id}
                    title={news.title}
                    date={news.date}
                    excerpt={news.excerpt}
                    image={news.image}
                    link={`/news#${news.id}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Announcements Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
                <Link 
                  to="/news#announcements" 
                  className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <AnnouncementCard 
                    key={announcement.id}
                    title={announcement.title}
                    date={announcement.date}
                    content={announcement.content}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About HMPS Azamgarh</h2>
              <p className="text-gray-600 mb-6">
                Established in 1954, HMPS Azamgarh has been a beacon of educational excellence 
                in the region for decades. Our institution is committed to providing a holistic 
                educational experience that nurtures not just academic brilliance but also character, 
                values, and social responsibility.
              </p>
              <p className="text-gray-600 mb-8">
                With state-of-the-art facilities, a team of dedicated educators, and a curriculum 
                designed to meet modern challenges, we prepare our students to excel in a rapidly 
                changing world while staying rooted in traditional values.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium"
              >
                <span>Learn more about our history and mission</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg" 
                alt="Campus Building" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-lg shadow-lg max-w-xs">
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-sm opacity-90">
                  To provide quality education that empowers students with knowledge, skills, 
                  and values to become responsible global citizens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Excellence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of academic programs designed to meet diverse learning needs 
              and prepare students for future success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary-600 mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Primary Education</h3>
              <p className="text-gray-600 mb-4">
                Our primary education program focuses on building a strong foundation through 
                engaging, activity-based learning experiences.
              </p>
              <Link 
                to="/academics#primary" 
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
              >
                <span>Learn More</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Program Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary-600 mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secondary Education</h3>
              <p className="text-gray-600 mb-4">
                Our secondary education program offers a balanced curriculum with academic rigor 
                and opportunities for extracurricular growth.
              </p>
              <Link 
                to="/academics#secondary" 
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
              >
                <span>Learn More</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Program Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary-600 mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Higher Secondary</h3>
              <p className="text-gray-600 mb-4">
                Our higher secondary program prepares students for university education and 
                future careers with specialized tracks.
              </p>
              <Link 
                to="/academics#higher-secondary" 
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
              >
                <span>Learn More</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button as={Link} to="/academics" variant="primary">
              Explore All Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
              <p className="text-gray-600 mb-6">
                Stay updated with our academic calendar and upcoming events. Join us to celebrate 
                learning and community engagement.
              </p>
              <Button as={Link} to="/news#events" variant="outline">
                View Full Calendar
              </Button>
            </div>
            
            <div className="lg:col-span-3 bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                {/* Event 1 */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="bg-primary-100 text-primary-800 p-3 rounded-lg text-center min-w-[60px]">
                    <span className="block text-sm font-semibold">APR</span>
                    <span className="block text-xl font-bold">15</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Annual Day Celebration</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>10:00 AM - 3:00 PM</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Join us for the annual day celebration featuring cultural performances, 
                      award ceremony, and special guest speakers.
                    </p>
                  </div>
                </div>
                
                {/* Event 2 */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="bg-primary-100 text-primary-800 p-3 rounded-lg text-center min-w-[60px]">
                    <span className="block text-sm font-semibold">APR</span>
                    <span className="block text-xl font-bold">22</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Science Exhibition</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>9:00 AM - 1:00 PM</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Explore innovative science projects created by our students at the 
                      annual science exhibition.
                    </p>
                  </div>
                </div>
                
                {/* Event 3 */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="bg-primary-100 text-primary-800 p-3 rounded-lg text-center min-w-[60px]">
                    <span className="block text-sm font-semibold">MAY</span>
                    <span className="block text-xl font-bold">05</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Parent-Teacher Meeting</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>2:00 PM - 5:00 PM</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Scheduled meeting for parents to discuss student progress and 
                      academic performance with teachers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Institution?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Take the first step towards a bright future. Apply for admission or 
            contact us to learn more about our programs and facilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button as={Link} to="/admission" variant="light">
              Apply for Admission
            </Button>
            <Button as={Link} to="/contact" variant="outline-light">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;