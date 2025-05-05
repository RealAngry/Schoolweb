import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Journey, { JourneyItem } from '../components/ui/journey';
import { 
  GraduationCap, 
  Trophy, 
  Calendar, 
  Flag, 
  School,
  Award,
  ChevronRight,
  Users,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';

const AboutPage: React.FC = () => {
  // Journey/Timeline items
  const journeyItems: JourneyItem[] = [
    {
      id: '1',
      title: 'School Foundation',
      description: 'Our institution was established with a vision to provide quality education to all students.',
      date: 'January 15, 1995',
      icon: <School size={14} />
    },
    {
      id: '2',
      title: 'First Graduation Batch',
      description: 'The first batch of students graduated with exceptional results and achievements.',
      date: 'March 20, 2000',
      icon: <GraduationCap size={14} />
    },
    {
      id: '3',
      title: 'National Recognition',
      description: 'The school received national recognition for its innovative teaching methodologies.',
      date: 'October 5, 2005',
      icon: <Award size={14} />
    },
    {
      id: '4',
      title: 'Sports Excellence Award',
      description: 'Our students won the state-level sports championship for the third consecutive year.',
      date: 'August 12, 2010',
      icon: <Trophy size={14} />
    },
    {
      id: '5',
      title: 'Digital Campus Initiative',
      description: 'Launched a comprehensive digital infrastructure to enhance the learning experience.',
      date: 'May 8, 2015',
      icon: <Calendar size={14} />
    },
    {
      id: '6',
      title: 'International Affiliation',
      description: 'Successfully established partnerships with prestigious international educational institutions.',
      date: 'February 23, 2020',
      icon: <Flag size={14} />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              About Our School
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Building futures through quality education and holistic development
            </p>
          </div>
        </div>
        
        {/* Navigation links for page sections */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center space-x-6 text-sm">
            <a href="#mission" className="text-gray-300 hover:text-white transition">Mission</a>
            <a href="#journey" className="text-gray-300 hover:text-white transition">Our Journey</a>
            <a href="#team" className="text-gray-300 hover:text-white transition">Our Team</a>
            <a href="#facilities" className="text-gray-300 hover:text-white transition">Facilities</a>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission & Vision</h2>
            <div className="mt-2 h-1 w-24 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To provide a nurturing and inclusive learning environment where students can develop their intellectual, physical, and social capabilities. We aim to empower our students with knowledge, skills, and values to navigate the complexities of the modern world.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To be recognized as a center of academic excellence and innovation, producing well-rounded individuals who contribute positively to society. We envision a learning community that fosters creativity, critical thinking, and a lifelong passion for knowledge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline/Journey Section */}
      <section id="journey" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Journey</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Key milestones in our history of excellence</p>
            <div className="mt-2 h-1 w-24 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <Journey items={journeyItems} className="py-10" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Leadership Team</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Meet the individuals guiding our institution</p>
            <div className="mt-2 h-1 w-24 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team member cards would go here */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dr. Sarah Johnson</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Principal</p>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  With over 20 years of experience in education administration and a doctorate in Educational Leadership.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prof. Michael Chen</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Vice Principal</p>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  An innovative educator with a focus on curriculum development and technology integration in classrooms.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mrs. Emily Rodriguez</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Head of Student Affairs</p>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  Dedicated to creating a supportive and enriching environment for students' personal growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Facilities</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">State-of-the-art infrastructure for academic excellence</p>
            <div className="mt-2 h-1 w-24 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Modern Library</h3>
              <p className="text-gray-700 dark:text-gray-300">
                A vast collection of books, digital resources, and quiet study spaces for students and faculty.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sports Complex</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Indoor and outdoor sports facilities, including a swimming pool, basketball courts, and athletic fields.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <GraduationCap className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tech Labs</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Cutting-edge computer labs, science laboratories, and innovation spaces for hands-on learning.
              </p>
            </motion.div>
              </div>
            </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our School Community</h2>
          <p className="text-gray-300 mb-8">
            Discover the difference our education can make in your child's future. Apply for admission or schedule a visit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;