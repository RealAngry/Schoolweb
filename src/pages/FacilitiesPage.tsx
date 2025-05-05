import React from 'react';
import { motion } from 'framer-motion';
import { 
  Library, 
  Monitor, 
  Beaker, 
  Award, 
  Music, 
  Utensils, 
  Bus, 
  Home, 
  ShieldCheck
} from 'lucide-react';

const facilities = [
  {
    id: 1,
    title: 'Modern Library',
    description: 'Our well-stocked library houses a diverse collection of books, journals, magazines, and digital resources to foster a love for reading and research.',
    icon: <Library className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'
  },
  {
    id: 2,
    title: 'Computer Labs',
    description: 'State-of-the-art computer laboratories equipped with the latest hardware and software to provide hands-on experience in technology.',
    icon: <Monitor className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg'
  },
  {
    id: 3,
    title: 'Science Laboratories',
    description: 'Well-equipped physics, chemistry, and biology laboratories for practical learning and scientific experiments.',
    icon: <Beaker className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg'
  },
  {
    id: 4,
    title: 'Sports Facilities',
    description: 'Extensive sports grounds for cricket, football, basketball, and athletics, along with indoor games facilities.',
    icon: <Award className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg'
  },
  {
    id: 5,
    title: 'Arts & Music Rooms',
    description: 'Dedicated spaces for visual arts, crafts, music, and dance to nurture creative expression and artistic talents.',
    icon: <Music className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/4709822/pexels-photo-4709822.jpeg'
  },
  {
    id: 6,
    title: 'Cafeteria',
    description: 'Spacious and hygienic cafeteria serving nutritious and balanced meals prepared under strict quality standards.',
    icon: <Utensils className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/6896183/pexels-photo-6896183.jpeg'
  },
  {
    id: 7,
    title: 'Transportation',
    description: 'Safe and reliable transportation service with GPS-enabled buses covering various routes for the convenience of students.',
    icon: <Bus className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/5767918/pexels-photo-5767918.jpeg'
  },
  {
    id: 8,
    title: 'Smart Classrooms',
    description: 'Technology-enabled classrooms with interactive boards, projectors, and audio-visual equipment for enhanced learning experiences.',
    icon: <Monitor className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/8423191/pexels-photo-8423191.jpeg'
  },
  {
    id: 9,
    title: 'Hostel Facilities',
    description: 'Comfortable and secure residential facilities with proper supervision and all necessary amenities for outstation students.',
    icon: <Home className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'
  },
  {
    id: 10,
    title: 'Health & Safety',
    description: 'Well-equipped medical room with trained staff, regular health check-ups, and comprehensive safety measures throughout the campus.',
    icon: <ShieldCheck className="text-primary-600 dark:text-primary-400" size={24} />,
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg'
  }
];

const FacilitiesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-primary-800 dark:bg-primary-900 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Campus & Facilities</h1>
            <p className="text-lg opacity-90">
              Explore the modern infrastructure and extensive facilities at HMPS Azamgarh
              designed to provide an optimal learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Overview Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Campus</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The HMPS Azamgarh campus is spread over a verdant and vast area near the bank of the Tamsa River, 
                offering a peaceful and natural environment conducive to learning. Our campus combines modern 
                infrastructure with natural beauty, providing students with a refreshing atmosphere away from the 
                urban hustle yet close to the city.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The impressive building at the entrance of the sprawling Kartalpur Bypass is the prestigious 
                Harish Chandra Mishra Public School (HMPS) – a luminous star in the galaxy of schools orbiting 
                the Azamgarh sky.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our campus is designed to provide a safe, inclusive, and stimulating environment where students 
                can learn, play, and grow. From well-ventilated classrooms to specialized labs and recreational 
                spaces, every aspect of our campus is thoughtfully planned to enhance the educational experience.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg" 
                alt="HMPS Campus" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg transition-colors duration-300">
                <div className="text-primary-600 dark:text-primary-400 text-center transition-colors duration-300">
                  <span className="block text-4xl font-bold">10+</span>
                  <span className="text-gray-800 dark:text-gray-200 transition-colors duration-300">Acres</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Gallery Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">Our Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      {facility.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{facility.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">Campus Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Infrastructure</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Modern building with spacious, well-ventilated classrooms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Digital learning resources integrated throughout the campus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Dedicated areas for co-curricular and extracurricular activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Administrative block with reception area and conference rooms</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Safety & Security</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>24/7 security personnel and CCTV surveillance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Secure entry and exit points with visitor management system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Fire safety equipment and regular evacuation drills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Child-safe furniture and equipment throughout the campus</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sports Facilities</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Large playground for cricket, football, and athletics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Basketball and volleyball courts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Indoor games facilities for table tennis, chess, and carrom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Dedicated areas for yoga and physical education</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Environment</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Lush green surroundings with various species of trees and plants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Eco-friendly campus with rainwater harvesting system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>School garden for botanical studies and environmental education</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Open spaces for outdoor classes and nature-based learning</span>
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
            What Parents Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  "The campus facilities at HMPS Azamgarh are exceptional. As a parent, I am particularly impressed by the safety measures and the clean, green environment. My child loves the library and sports facilities."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">R</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Rajesh Kumar</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Parent of Class 8 Student</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  "The smart classrooms and computer labs have given my daughter access to modern learning tools. I've seen a significant improvement in her tech skills and overall academic performance."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Sneha Gupta</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Parent of Class 10 Student</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  "The transportation service is reliable and convenient. The drivers are experienced, and the buses are well-maintained. It gives me peace of mind knowing my child is traveling safely to and from school."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Manoj Sharma</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Parent of Class 5 Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Visit Our Campus</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            We invite you to experience our campus and facilities firsthand. Schedule a visit to see 
            how HMPS Azamgarh provides an ideal environment for your child's education.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
            >
              Schedule a Visit
            </a>
            <a 
              href="/admission" 
              className="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-md shadow-md hover:bg-white/10 transition duration-300"
            >
              Apply for Admission
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage; 