import React, { useState, useEffect } from 'react';
import Cards from '../../../components/Cards';

const defaultSlides = [
  {
    title: "Beyond the Curve: Key industry-shaping technology themes for 2025!",
    image: "/beyond.png",
    alt: "Data and AI",
    text: ""
  },
  {
    title: "Envisioning new relevance in the age of AI",
    image: "/digital.png",
    alt: "Platform and Product Engineering",
    text: "We carve out new possibilities every day. Where technology and human ingenuity converge to usher in new frontiers of innovation and relevance."
  },
  {
    title: "Engineering at the heart of everything",
    image: "/engheart.png",
    alt: "Cloud and Infrastructure",
    text: "Every organization's digital journey is unique. We create bespoke solutions that engineer your tomorrow, today."
  },
  {
    title: "Pioneering tomorrow's generative enterprises",
    image: "/Creative.png",
    alt: "Digital Transformation",
    text: "We build with AI to give you a competitive edge and become generative enterprises™ of the future"
  }
];

const Home = ({ slidesData }) => {
  // Use slidesData if provided; otherwise, defaultSlides.
  const [slides, setSlides] = useState(slidesData || defaultSlides);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update slides if the slidesData prop changes.
  useEffect(() => {
    if (slidesData) {
      setSlides(slidesData);
      setActiveIndex(0);
    }
  }, [slidesData]);

  // Optional: Fetch slides from an API if no slidesData is passed.
  useEffect(() => {
    if (!slidesData) {
      const fetchSlides = async () => {
        try {
          const response = await fetch('/api/slides'); // Adjust the endpoint accordingly.
          if (response.ok) {
            const data = await response.json();
            if (data.slides && data.slides.length > 0) {
              setSlides(data.slides);
              setActiveIndex(0);
            }
          }
        } catch (error) {
          console.error('Failed to fetch slides:', error);
        }
      };
      fetchSlides();
    }
  }, [slidesData]);

  // Automatically change slides every 3 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="w-full">
      <div className="relative shadow-lg">
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full ${activeIndex === idx ? 'bg-white' : 'bg-gray-400'}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Carousel Items */}
        <div className="relative overflow-hidden">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`${
                activeIndex === idx ? 'relative opacity-100' : 'absolute opacity-0'
              } transition-opacity duration-500 ease-in-out bg-gradient-to-r from-black to-gray-300 flex items-center justify-center w-full h-[60vh] md:h-[80vh]`}
            >
              <div className="flex flex-wrap items-center w-full">
                {/* Text Section */}
                <div className="w-full md:w-1/2 px-4 md:pl-[10%]">
                  <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">{slide.title}</h1>
                  {slide.text && (
                    <p className="text-white text-base sm:text-lg">
                      {slide.text}
                    </p>
                  )}
                </div>
                {/* Image Section */}
                <div className="w-full md:w-1/2 text-center mt-4 md:mt-0">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="max-w-full sm:max-w-[70%] h-[40vh] sm:h-[60vh] rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out object-cover mx-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 z-10"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 z-10"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Cards Section */}
      <div className="bg-gradient-to-r from-black to-gray-300">
        <Cards />
      </div>
    </div>
  );
};

export default Home;
