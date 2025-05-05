import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const Events = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Events</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={`https://images.pexels.com/photos/${1000 + index}/pexels-photo-${1000 + index}.jpeg`}
                alt="Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                Upcoming
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Academic Conference {index + 1}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join us for an exciting academic conference featuring renowned speakers and innovative research presentations.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <CalendarIcon size={16} className="mr-2" />
                  <span>March {15 + index}, 2024</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock size={16} className="mr-2" />
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>Main Auditorium</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((_, i) => (
                    <img
                      key={i}
                      src={`https://images.pexels.com/photos/${220453 + i}/pexels-photo-${220453 + i}.jpeg`}
                      alt="Attendee"
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-xs text-gray-600 dark:text-gray-300">+12</span>
                  </div>
                </div>
                <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;