import React, { useEffect, useState } from 'react';
// import { allPhotos } from '../data/photos';
import { Heart } from 'lucide-react';

function AllPhotos() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const featuredPhotos = [
    {
      url: "image.png",
      title: "Our Journey Together",
      description: "Every moment becomes a treasured memory"
    },
    {
      url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
      title: "Special Moments",
      description: "Capturing the magic in everyday life"
    },
    {
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
      title: "Forever Love",
      description: "Building memories that last a lifetime"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPhotos.length);
    }, 5000);

    setIsVisible(true);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-10">
      {/* Hero Section with Animation */}
      <div className="p-10 relative h-[80vh] overflow-hidden rounded-2xl">
        {featuredPhotos.map((photo, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-12 transform transition-transform duration-700 translate-y-0">
                <h2 className="text-5xl font-serif text-white mb-4">{photo.title}</h2>
                <p className="text-xl text-rose-200">{photo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Quote Section */}
      <div className={`text-center space-y-6 transform transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <Heart className="h-12 w-12 text-rose-500 mx-auto animate-pulse" />
        <blockquote className="text-3xl font-serif text-gray-800 italic">
          "Every love story is beautiful, but ours is my favorite"
        </blockquote>
      </div>

      {/* Main Gallery Title */}
      <h1 className="text-4xl font-serif text-gray-800 mb-12 text-center">
        Our Beautiful Moments
      </h1>

      {/* Parallax Scrolling Section */}
      <div className="relative h-96 mb-24 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-fixed"
             style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               transform: 'translateZ(-1px) scale(1.5)'
             }}>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-4xl font-serif text-white text-center px-4">
              Cherishing Every Moment Together
            </h2>
          </div>
        </div>
      </div>

      {/* Masonry Gallery */}
      {/* <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {allPhotos.map((photo, index) => (
          <div
            key={index}
            className="break-inside-avoid relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={photo.url}
              alt={photo.description}
              className="w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white">{photo.description}</p>
              <p className="text-rose-300 text-sm mt-1">{photo.date}</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default AllPhotos;