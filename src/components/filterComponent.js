import React, { useState } from "react";

const FilterDropdown = ({ options, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const [subOptions, setSubOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);

    // Show sub-options for specific filters
    if (filter === "Age") {
      setSubOptions(["0-18", "19-35", "36-50", "51+"]);
      setSubDropdownOpen(true);
    } else if (filter === "Gender") {
      setSubOptions(["Female", "Male", "Others"]);
      setSubDropdownOpen(true);
    } else {
      setSubDropdownOpen(false);
      if (onFilterChange) onFilterChange({ filter }); // Notify parent directly for other filters
    }
  };

  const handleSubOptionSelect = (subOption) => {
    setSubDropdownOpen(false);
    if (onFilterChange) {
      onFilterChange({ filter: selectedFilter, subOption }); // Notify parent with selected filter and sub-option
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Main Dropdown */}
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
        >
          {selectedFilter || "Select Filter"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 right-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleFilterSelect(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sub-dropdown */}
      {subDropdownOpen && (
        <div className="absolute z-10 right-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {subOptions.map((subOption, index) => (
              <button
                key={index}
                onClick={() => handleSubOptionSelect(subOption)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {subOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
