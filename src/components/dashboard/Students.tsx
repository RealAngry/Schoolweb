import React from 'react';
import { Search, Filter } from 'lucide-react';

const Students = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Students</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Add Student
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Name</th>
                  <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">ID</th>
                  <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Course</th>
                  <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="pb-3 font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={`https://images.pexels.com/photos/${220453 + index}/pexels-photo-${220453 + index}.jpeg`}
                          alt="Student"
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                        <span className="text-gray-900 dark:text-white">Student {index + 1}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">STU{1000 + index}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">Computer Science</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;