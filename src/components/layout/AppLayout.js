import React, { useState } from 'react';
import Header from './Header'; // Ensure correct import path

const AppLayout = ({ children }) => {
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    console.log(`Category selected: ${selectedCategory}`);
    // Add logic to filter products by category
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log(`Search query: ${query}`);
    // Add logic to filter products by search query
  };

  return (
    <div>
      <Header onSelectCategory={handleCategorySelect} onSearch={handleSearch} />
      {children}
    </div>
  );
};

export default AppLayout;