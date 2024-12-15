import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const offers = [
    {
      text: "Explore our latest deals!",
      image: "https://source.unsplash.com/1600x600/?shopping,store",
    },
    {
      text: "Discover top-rated products!",
      image: "https://source.unsplash.com/1600x600/?ecommerce,products",
    },
    {
      text: "Shop now and save big!",
      image: "https://source.unsplash.com/1600x600/?discount,sale",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 text-center shadow-lg">
      <img
        src={offers[currentIndex].image}
        alt={offers[currentIndex].text}
        className="w-full h-64 object-cover opacity-80 rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-2xl font-bold bg-black bg-opacity-60 p-4 rounded-lg">
          {offers[currentIndex].text}
        </h2>
      </div>
    </div>
  );
};

export default Banner;