import React from 'react';
import { motion } from 'framer-motion';
import Journey, { JourneyItem } from '../ui/journey';
import { 
  GraduationCap, 
  Trophy, 
  Calendar, 
  Flag, 
  School,
  Award
} from 'lucide-react';

const SchoolJourney: React.FC = () => {
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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">School Journey</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Key milestones and events in our institution's history
          </p>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <Journey items={journeyItems} className="py-10" />
      </div>
    </div>
  );
};

export default SchoolJourney; 