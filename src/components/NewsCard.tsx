import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, date, excerpt, image, link }) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          to={link}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;