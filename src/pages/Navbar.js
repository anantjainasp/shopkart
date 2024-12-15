import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/products";

export const Navbar = ({ onSelectCategory, onSearch }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getCategories();
  }, []);

  return (
    <nav className="bg-primary-color p-4 flex flex-wrap items-center justify-between shadow-md">
      <div className="flex justify-center w-full">
        <ul className="flex flex-wrap justify-center space-x-4">
          {categories.map((category) => (
            <li key={category} className="block">
              <button
                className="text-button-text-color hover:text-accent-color block p-2"
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <select
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-accent-color"
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-accent-color flex-grow"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </nav>
  );
};