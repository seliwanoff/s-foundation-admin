import React, { useState } from "react";

const YearSelection = ({ setselectedYear }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => currentYear - index);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setselectedYear(year);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[100px] z-0">
      {/* Selected Year Display */}
      <div
        className="border  rounded-md p-2 bg-white cursor-pointer text-sm font-Polysans"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedYear}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-md rounded-md  border-gray-300 z-10">
          {years.map((year) => (
            <div
              key={year}
              className={`p-2 cursor-pointer hover:bg-gray-100 text-sm font-Inter ${
                year === selectedYear ? "bg-gray-200 font-bold " : ""
              }`}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearSelection;
