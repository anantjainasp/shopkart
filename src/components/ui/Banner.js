import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const offers = [
    {
      text: "Explore our latest deals!",
    },
    {
      text: "Discover top-rated products!",
    },
    {
      text: "Shop now and save big!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="relative"
         >
         <img
                className="w-full h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh] xl:h-[60vh]  object-content"

            src="https://images.unsplash.com/photo-1441986380878-c4248f5b8b5b?//1200x600"
            alt="Shopping"
          />
          <div className="absolute inset-0 bg-gray-500 mix-blend-multiply"></div>      <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold bg-blue-300 bg-opacity-50 p-4 rounded-lg text-white">
    {offers[currentIndex].text}
</h2>
      </div>
    </div>
  );
};

export default Banner;