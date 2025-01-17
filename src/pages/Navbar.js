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
      <div className="flex justify-between w-full md:w-auto">
        <ul className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
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
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-2 sm:mt-0">
        <select
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-accent-color"
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="">All Catelmlkjgories</option>
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