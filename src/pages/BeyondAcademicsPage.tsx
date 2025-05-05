import React from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Palette, 
  Users, 
  Trophy, 
  Leaf, 
  Globe, 
  Cpu, 
  BookOpen
} from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Performing Arts',
    description: 'Students explore their talents in music, dance, theater, and public speaking through regular classes and special performances.',
    icon: <Music className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg'
  },
  {
    id: 2,
    title: 'Visual Arts & Crafts',
    description: 'Our art programs encourage creativity through painting, drawing, sculpture, and various craft activities.',
    icon: <Palette className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/8850709/pexels-photo-8850709.jpeg'
  },
  {
    id: 3,
    title: 'Sports & Athletics',
    description: 'We offer a wide range of sports including cricket, football, basketball, athletics, yoga, and martial arts.',
    icon: <Trophy className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg'
  },
  {
    id: 4,
    title: 'Clubs & Societies',
    description: 'Students can join various clubs like science club, eco club, literary club, and mathematics club.',
    icon: <Users className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/8423025/pexels-photo-8423025.jpeg'
  },
  {
    id: 5,
    title: 'Environmental Awareness',
    description: 'Our eco club conducts tree planting, campus clean-ups, and awareness campaigns about environmental conservation.',
    icon: <Leaf className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/6969866/pexels-photo-6969866.jpeg'
  },
  {
    id: 6,
    title: 'Community Service',
    description: 'Students participate in community outreach programs to develop empathy, social responsibility, and leadership skills.',
    icon: <Globe className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg'
  },
  {
    id: 7,
    title: 'Technology & Coding',
    description: 'Students learn programming, robotics, and digital media production in our state-of-the-art computer labs.',
    icon: <Cpu className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/8471982/pexels-photo-8471982.jpeg'
  },
  {
    id: 8,
    title: 'Reading & Literary Activities',
    description: 'Our library hosts book clubs, creative writing workshops, and literary competitions to foster a love for reading.',
    icon: <BookOpen className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/7173026/pexels-photo-7173026.jpeg'
  }
];

const BeyondAcademicsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-primary-800 dark:bg-primary-900 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Beyond Academics</h1>
            <p className="text-lg opacity-90">
              Discover the rich variety of extra-curricular activities that complement our academic curriculum
              at HMPS Azamgarh.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Holistic Development</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At HMPS Azamgarh, we believe education extends far beyond traditional academics. Our diverse 
              extra-curricular program is designed to help students discover and develop their individual talents 
              and interests, building confidence, teamwork, and leadership skills along the way.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              The hobbies we cultivate as children enrich our lives as adults. Thus, our students are exposed 
              to a variety of activities like music, drama, dance, fine arts, gardening, and more to help them 
              grow into well-rounded individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
            Extra-Curricular Activities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      {activity.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{activity.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
            Benefits of Extra-Curricular Activities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Personal Growth</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Builds confidence and self-esteem</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Develops time management and prioritization skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Enhances physical fitness and mental well-being</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Provides a constructive outlet for energy and creativity</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Social Development</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Fosters teamwork and collaboration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Develops leadership skills and responsibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Creates opportunities to meet like-minded peers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Teaches respect, fair play, and good sportsmanship</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Academic Benefits</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Improves cognitive function and concentration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Teaches discipline and dedication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Provides practical application of classroom learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Enhances problem-solving and critical thinking skills</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Future Advantages</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Stands out on college applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Develops valuable skills for future careers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Provides opportunities for scholarships and recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Creates lifelong interests and healthy habits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
            Student Experiences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Ananya Singh</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Class 10 Student</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Being part of the school dance team has boosted my confidence tremendously. I've made amazing friends and learned the value of perseverance through our rigorous practice sessions."
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">R</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Rahul Gupta</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Class 12 Student</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "The science club activities helped me discover my passion for physics. The hands-on experiments and science exhibitions have prepared me well for my engineering aspirations."
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">P</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Priya Sharma</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Class 9 Student</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Playing basketball has taught me the importance of teamwork and discipline. I've become more focused in my studies, and I've learned how to balance my time between academics and sports."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Find Your Passion at HMPS Azamgarh</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            We encourage all students to explore their interests and discover new talents through our diverse 
            range of extra-curricular activities.
          </p>
          <a 
            href="/admission" 
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default BeyondAcademicsPage; 