import React, { useState } from 'react';
import { Calendar, Clock, Search, Bell, ChevronRight, MapPin } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
}

interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  important: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const NewsPage: React.FC = () => {
  // Sample news data
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Annual Sports Day Celebration',
      date: '2025-03-25',
      excerpt: 'Join us for the annual sports day celebration featuring various competitions and events.',
      content: `
        <p>HMPS Azamgarh is pleased to announce our Annual Sports Day scheduled for March 25, 2025. This year's event promises to be bigger and better than ever before, with a wide range of athletic competitions and team sports.</p>
        
        <p>Students from all classes will participate in track and field events, team sports, and individual competitions. Special events for parents and alumni will also be organized to promote community engagement.</p>
        
        <p>The event will begin at 9:00 AM with a grand opening ceremony, followed by various competitions throughout the day. Prizes and certificates will be awarded to winners in a closing ceremony at 4:00 PM.</p>
        
        <p>We invite all parents, guardians, and alumni to join us for this celebration of sportsmanship and physical fitness.</p>
      `,
      category: 'Events',
      image: 'https://images.pexels.com/photos/159745/school-active-education-teacher-159745.jpeg',
    },
    {
      id: 2,
      title: 'Science Exhibition Results',
      date: '2025-03-15',
      excerpt: 'Congratulations to all participants and winners of our Annual Science Exhibition.',
      content: `
        <p>The Annual Science Exhibition held on March 10-12, 2025, was a tremendous success with over 150 student projects showcasing innovation and scientific inquiry.</p>
        
        <p>We are pleased to announce the winners in different categories:</p>
        
        <ul>
          <li><strong>Best Overall Project:</strong> "Renewable Energy Solutions" by Ankit Sharma and team (Class 12)</li>
          <li><strong>Best Innovation:</strong> "Smart Irrigation System" by Priya Patel (Class 11)</li>
          <li><strong>Best Presentation:</strong> "Biodegradable Plastics" by Rahul Kumar and team (Class 10)</li>
          <li><strong>Best Junior Project:</strong> "Solar Powered Toy Car" by Riya Singh (Class 8)</li>
        </ul>
        
        <p>Special recognition goes to our science faculty for their guidance and support to all participants. The winning projects will be displayed in the school lobby for the next two weeks.</p>
        
        <p>Congratulations to all participants for their hard work and scientific spirit!</p>
      `,
      category: 'Academics',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    },
    {
      id: 3,
      title: 'New Computer Lab Inauguration',
      date: '2025-03-05',
      excerpt: 'We are pleased to announce the inauguration of our state-of-the-art computer laboratory.',
      content: `
        <p>HMPS Azamgarh is proud to announce the inauguration of our new state-of-the-art computer laboratory on March 5, 2025. The lab is equipped with 50 latest-model computers, high-speed internet connectivity, and specialized software for various educational purposes.</p>
        
        <p>The new facility features:</p>
        
        <ul>
          <li>50 high-performance desktop computers with the latest specifications</li>
          <li>Interactive smart boards for teaching</li>
          <li>Specialized software for programming, graphic design, and digital literacy</li>
          <li>High-speed internet connectivity</li>
          <li>Ergonomic furniture for student comfort</li>
        </ul>
        
        <p>The lab was inaugurated by Dr. Rajendra Singh, Director of the District Education Department, in the presence of our Principal, faculty members, and student representatives.</p>
        
        <p>This new facility will enhance our computer science curriculum and provide students with hands-on experience in the latest technologies, preparing them for future academic and career opportunities in the digital world.</p>
      `,
      category: 'Infrastructure',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    },
    {
      id: 4,
      title: 'Outstanding Results in Board Examinations',
      date: '2025-02-20',
      excerpt: 'HMPS Azamgarh students achieve excellent results in the 2025 board examinations.',
      content: `
        <p>We are proud to announce that HMPS Azamgarh students have achieved outstanding results in the 2025 board examinations. Our students have once again demonstrated excellence in academics, maintaining our tradition of high performance.</p>
        
        <p>Key highlights of this year's results:</p>
        
        <ul>
          <li>100% pass rate for both Class 10 and Class 12</li>
          <li>85% of students scored above 80% marks</li>
          <li>15 students scored above 95% marks</li>
          <li>Meera Agarwal (Class 12 - Science) scored 98.6%, the highest in the district</li>
          <li>Raj Sharma (Class 10) scored 97.8%, ranking among the top 5 in the state</li>
        </ul>
        
        <p>The school management congratulates all students, parents, and teachers for this remarkable achievement. A special felicitation ceremony will be held on March 5 to honor the top performers.</p>
        
        <p>These results reflect the hard work of our students, the dedication of our teachers, and the supportive environment we strive to provide at HMPS Azamgarh.</p>
      `,
      category: 'Academics',
      image: 'https://images.pexels.com/photos/5212649/pexels-photo-5212649.jpeg',
    },
    {
      id: 5,
      title: 'Cultural Festival "Tarang 2025" Announced',
      date: '2025-02-10',
      excerpt: 'Our annual cultural festival "Tarang 2025" will be held on April 15-17, 2025.',
      content: `
        <p>HMPS Azamgarh is excited to announce our annual cultural festival "Tarang 2025" scheduled for April 15-17, 2025. This three-day extravaganza will showcase the artistic and cultural talents of our students through various performances and competitions.</p>
        
        <p>The festival will feature:</p>
        
        <ul>
          <li>Classical and contemporary dance performances</li>
          <li>Vocal and instrumental music competitions</li>
          <li>Drama and theatrical productions</li>
          <li>Art and craft exhibition</li>
          <li>Literary events including debate, elocution, and poetry recitation</li>
          <li>Cultural fashion show representing India's diverse heritage</li>
        </ul>
        
        <p>The theme for this year's festival is "Unity in Diversity," celebrating India's rich cultural heritage. Students are already busy preparing for various events under the guidance of our cultural committee and faculty advisors.</p>
        
        <p>Parents, alumni, and community members are invited to attend the festival. Entry passes will be available from April 1 at the school reception.</p>
        
        <p>We look forward to showcasing the creativity and talent of our students at Tarang 2025!</p>
      `,
      category: 'Events',
      image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg',
    },
    {
      id: 6,
      title: 'National Science Olympiad Winners',
      date: '2025-01-25',
      excerpt: 'HMPS Azamgarh students shine at the National Science Olympiad 2025.',
      content: `
        <p>We are proud to announce that HMPS Azamgarh students have excelled at the National Science Olympiad 2025, bringing home several awards and recognition.</p>
        
        <p>Our students competed against participants from over 500 schools across the country and achieved remarkable results:</p>
        
        <ul>
          <li>Ananya Sharma (Class 10) - Gold Medal in Junior Category</li>
          <li>Rohan Patel (Class 12) - Silver Medal in Senior Category</li>
          <li>Arjun Singh (Class 9) - Bronze Medal in Junior Category</li>
          <li>The HMPS Team - 2nd Place in the Team Competition</li>
        </ul>
        
        <p>The competition tested students' knowledge in various scientific disciplines including physics, chemistry, biology, and mathematics, as well as their practical application skills through challenging experiments and problem-solving tasks.</p>
        
        <p>We extend our heartiest congratulations to the winning students and their mentors, especially Dr. Amit Verma, Head of the Science Department, for his guidance and encouragement.</p>
        
        <p>These achievements reflect our commitment to excellence in science education and our focus on nurturing scientific curiosity and analytical thinking among our students.</p>
      `,
      category: 'Achievements',
      image: 'https://images.pexels.com/photos/8926548/pexels-photo-8926548.jpeg',
    },
  ];

  // Sample announcements
  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Admissions Open for 2025-26',
      date: '2025-03-20',
      content: 'Admissions are now open for the academic year 2025-26. Apply before April 30.',
      important: true,
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: '2025-03-28',
      content: 'Parent-Teacher Meeting scheduled for all classes on March 28, 2025.',
      important: false,
    },
    {
      id: 3,
      title: 'Holiday Notice',
      date: '2025-04-01',
      content: 'The institution will remain closed on April 2-3, 2025 due to local festivals.',
      important: true,
    },
    {
      id: 4,
      title: 'Scholarship Test',
      date: '2025-04-10',
      content: 'Scholarship test for new and existing students will be held on April 10, 2025.',
      important: false,
    },
    {
      id: 5,
      title: 'Library Book Return',
      date: '2025-03-30',
      content: 'All library books must be returned by March 30, 2025 for the annual library audit.',
      important: false,
    },
    {
      id: 6,
      title: 'Summer Uniform',
      date: '2025-04-05',
      content: 'Students should switch to summer uniform from April 15, 2025.',
      important: false,
    },
    {
      id: 7,
      title: 'Fee Payment Reminder',
      date: '2025-04-01',
      content: 'Last date for payment of quarterly fees is April 10, 2025.',
      important: true,
    },
    {
      id: 8,
      title: 'Extra Classes',
      date: '2025-03-25',
      content: 'Extra classes for Class 10 and 12 will commence from April 1, 2025.',
      important: false,
    },
  ];

  // Sample events
  const events: Event[] = [
    {
      id: 1,
      title: 'Annual Day Celebration',
      date: '2025-04-15',
      time: '10:00 AM - 3:00 PM',
      location: 'School Auditorium',
      description: 'Join us for the annual day celebration featuring cultural performances, award ceremony, and special guest speakers.',
    },
    {
      id: 2,
      title: 'Science Exhibition',
      date: '2025-04-22',
      time: '9:00 AM - 1:00 PM',
      location: 'School Hall',
      description: 'Explore innovative science projects created by our students at the annual science exhibition.',
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2025-05-05',
      time: '2:00 PM - 5:00 PM',
      location: 'Respective Classrooms',
      description: 'Scheduled meeting for parents to discuss student progress and academic performance with teachers.',
    },
    {
      id: 4,
      title: 'Inter-School Debate Competition',
      date: '2025-05-12',
      time: '10:00 AM - 1:00 PM',
      location: 'School Auditorium',
      description: 'Annual inter-school debate competition with participation from 15 schools across the district.',
    },
    {
      id: 5,
      title: 'Career Counseling Session',
      date: '2025-05-20',
      time: '11:00 AM - 1:00 PM',
      location: 'Conference Hall',
      description: 'Special career counseling session for Class 10 and 12 students by industry experts and alumni.',
    },
    {
      id: 6,
      title: 'Summer Camp Registration',
      date: '2025-05-25',
      time: '9:00 AM - 12:00 PM',
      location: 'Administrative Office',
      description: 'Registration for the annual summer camp offering sports, arts, and skill development activities.',
    },
  ];

  const [activeNewsId, setActiveNewsId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'announcements' | 'events'>('news');
  
  // Filter content based on search term
  const filteredNews = newsItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAnnouncements = announcements.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredEvents = events.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">News & Events</h1>
            <p className="text-lg opacity-90">
              Stay updated with the latest happenings, announcements, and upcoming events at HMPS Azamgarh.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Tabs */}
      <section className="bg-white sticky top-16 z-30 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search news, events..."
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 border rounded-md overflow-hidden">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'news'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('news')}
              >
                News
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'announcements'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('announcements')}
              >
                Announcements
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'events'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('events')}
              >
                Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-12 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4">
          {/* News Tab */}
          {activeTab === 'news' && (
            <>
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* News List */}
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest News</h2>
                    
                    <div className="space-y-6">
                      {filteredNews.map((news) => (
                        <div 
                          key={news.id}
                          className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border-l-4 ${
                            activeNewsId === news.id ? 'border-primary-600' : 'border-transparent'
                          }`}
                        >
                          <div className="md:flex">
                            <div className="md:flex-shrink-0 w-full md:w-48 h-48">
                              <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6">
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                <Calendar size={14} className="mr-1" />
                                <span>
                                  {new Date(news.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </span>
                                <span className="mx-2">•</span>
                                <span className="text-primary-600">{news.category}</span>
                              </div>
                              <h3 className="font-bold text-gray-800 text-xl mb-2">{news.title}</h3>
                              <p className="text-gray-600 mb-4">{news.excerpt}</p>
                              <button
                                onClick={() => setActiveNewsId(news.id === activeNewsId ? null : news.id)}
                                className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                              >
                                <span>{activeNewsId === news.id ? 'Read Less' : 'Read More'}</span>
                                <ChevronRight size={16} className={`ml-1 transition-transform ${
                                  activeNewsId === news.id ? 'rotate-90' : ''
                                }`} />
                              </button>
                              
                              {activeNewsId === news.id && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  <div 
                                    className="text-gray-700 prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: news.content }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sidebar */}
                  <div>
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-36">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
                      <ul className="space-y-2">
                        {Array.from(new Set(newsItems.map(item => item.category))).map((category, index) => (
                          <li key={index}>
                            <button
                              onClick={() => setSearchTerm(category)}
                              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                            >
                              <ChevronRight size={16} className="mr-1" />
                              <span>{category}</span>
                              <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {newsItems.filter(item => item.category === category).length}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Archives</h3>
                        <ul className="space-y-2">
                          {Array.from(new Set(newsItems.map(item => {
                            const date = new Date(item.date);
                            return `${date.getFullYear()}-${date.getMonth() + 1}`;
                          }))).map((yearMonth, index) => {
                            const [year, month] = yearMonth.split('-').map(Number);
                            const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
                            
                            return (
                              <li key={index}>
                                <button
                                  onClick={() => setSearchTerm(`${monthName} ${year}`)}
                                  className="text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                                >
                                  <ChevronRight size={16} className="mr-1" />
                                  <span>{`${monthName} ${year}`}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No news found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </div>
              )}
            </>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div id="announcements">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Announcements</h2>
              
              {filteredAnnouncements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAnnouncements.map((announcement) => (
                    <div 
                      key={announcement.id}
                      className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${
                        announcement.important ? 'border-red-500' : 'border-primary-500'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-800">{announcement.title}</h3>
                        <Bell size={18} className={announcement.important ? 'text-red-500' : 'text-primary-500'} />
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(announcement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-gray-600">{announcement.content}</p>
                      {announcement.important && (
                        <div className="mt-4 bg-red-50 text-red-800 text-sm p-2 rounded">
                          Important announcement
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No announcements found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div id="events">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
              
              {filteredEvents.length > 0 ? (
                <div className="space-y-6">
                  {filteredEvents.map((event) => {
                    const eventDate = new Date(event.date);
                    return (
                      <div 
                        key={event.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="md:flex">
                          <div className="bg-primary-600 text-white p-6 md:w-48 flex flex-col items-center justify-center text-center">
                            <span className="block text-sm font-medium">
                              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                            <span className="block text-4xl font-bold">
                              {eventDate.getDate()}
                            </span>
                            <span className="block text-sm">
                              {eventDate.toLocaleDateString('en-US', { year: 'numeric' })}
                            </span>
                          </div>
                          <div className="p-6">
                            <h3 className="font-bold text-gray-800 text-xl mb-2">{event.title}</h3>
                            <div className="flex flex-wrap gap-y-2 text-sm text-gray-600 mb-4">
                              <div className="flex items-center mr-6">
                                <Clock size={16} className="mr-1 text-primary-600" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-1 text-primary-600" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <p className="text-gray-600">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No events found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-12 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive the latest news, announcements, and event updates directly in your inbox.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-800"
              />
              <button className="bg-primary-800 hover:bg-primary-900 px-6 py-3 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-80 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;