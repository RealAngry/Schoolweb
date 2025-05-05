import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  date: string;
}

const GalleryPage: React.FC = () => {
  // Sample gallery images
  const images: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/8471767/pexels-photo-8471767.jpeg',
      alt: 'Science Exhibition',
      category: 'Events',
      date: '2025-02-15',
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/8423010/pexels-photo-8423010.jpeg',
      alt: 'Annual Sports Day',
      category: 'Sports',
      date: '2025-01-20',
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1184580/pexels-photo-1184580.jpeg',
      alt: 'Art Competition',
      category: 'Cultural',
      date: '2025-03-05',
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/8535790/pexels-photo-8535790.jpeg',
      alt: 'Classroom Activities',
      category: 'Academic',
      date: '2025-02-28',
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/8844887/pexels-photo-8844887.jpeg',
      alt: 'School Building',
      category: 'Campus',
      date: '2024-12-10',
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/5428011/pexels-photo-5428011.jpeg',
      alt: 'Independence Day Celebration',
      category: 'Events',
      date: '2024-08-15',
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg',
      alt: 'Library',
      category: 'Campus',
      date: '2024-11-25',
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
      alt: 'Computer Lab',
      category: 'Campus',
      date: '2024-12-15',
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/8412414/pexels-photo-8412414.jpeg',
      alt: 'Debate Competition',
      category: 'Cultural',
      date: '2025-01-10',
    },
    {
      id: 10,
      src: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg',
      alt: 'School Garden',
      category: 'Campus',
      date: '2024-10-05',
    },
    {
      id: 11,
      src: 'https://images.pexels.com/photos/6507841/pexels-photo-6507841.jpeg',
      alt: 'Dance Performance',
      category: 'Cultural',
      date: '2024-12-20',
    },
    {
      id: 12,
      src: 'https://images.pexels.com/photos/5031323/pexels-photo-5031323.jpeg',
      alt: 'Cricket Match',
      category: 'Sports',
      date: '2025-02-10',
    },
    {
      id: 13,
      src: 'https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg',
      alt: 'School Building Front View',
      category: 'Campus',
      date: '2024-09-15',
    },
    {
      id: 14,
      src: 'https://images.pexels.com/photos/8471981/pexels-photo-8471981.jpeg',
      alt: 'Mathematics Workshop',
      category: 'Academic',
      date: '2025-01-25',
    },
    {
      id: 15,
      src: 'https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg',
      alt: 'Classroom Discussion',
      category: 'Academic',
      date: '2025-02-05',
    },
  ];

  const categories = ['All', 'Events', 'Sports', 'Cultural', 'Academic', 'Campus'];
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-lg opacity-90">
              Explore the vibrant life at HMPS Azamgarh through our collection of photographs
              capturing academic, cultural, and sporting events.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <p className="font-medium">{image.alt}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="font-medium text-gray-800">{image.alt}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-primary-600">{image.category}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(image.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No images found</h3>
              <p className="text-gray-600">No images available in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-colors focus:outline-none"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 bg-white bg-opacity-90 p-4 rounded-lg">
              <h3 className="font-bold text-lg text-gray-800">{lightboxImage.alt}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-primary-600">{lightboxImage.category}</span>
                <span className="text-gray-600">
                  {new Date(lightboxImage.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Video Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Video 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Annual Day Function" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-64"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Annual Day Function 2025</h3>
                <p className="text-gray-600 text-sm">
                  Highlights from our grand Annual Day celebration featuring cultural performances by students.
                </p>
              </div>
            </div>
            
            {/* Video 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Science Exhibition" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-64"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Science Exhibition 2025</h3>
                <p className="text-gray-600 text-sm">
                  Student projects and innovations showcased at our annual science exhibition.
                </p>
              </div>
            </div>
            
            {/* Video 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Campus Tour" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-64"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Virtual Campus Tour</h3>
                <p className="text-gray-600 text-sm">
                  Take a virtual tour of our school campus and facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Photos Section */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Memories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Are you an alumnus or current student with photos of school events? Share your memories with us and 
            be featured in our gallery.
          </p>
          <a 
            href="mailto:gallery@hmpsazamgarh.org" 
            className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
          >
            Submit Your Photos
          </a>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;