import React from "react";

const SearchBar = ({ 
  searchField, 
  setSearchField, 
  searchQuery, 
  setSearchQuery, 
  searchOptions 
}) => {
  return (
    <div className="flex items-center">
      {/* Dropdown to select which field to search on */}
      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {searchOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`Search by ${searchField}...`}
        className="flex-grow px-4 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
