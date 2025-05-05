import React from 'react';
import { Bell } from 'lucide-react';

interface AnnouncementCardProps {
  title: string;
  date: string;
  content: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ title, date, content }) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="border-l-4 border-primary-500 pl-4 py-2">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <Bell size={16} className="text-primary-500" />
      </div>
      <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
};

export default AnnouncementCard;