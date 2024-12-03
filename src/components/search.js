import React, { useState } from "react";

const SearchComponent = ({ handleSearch, placeholder = "Search..." }) => {
  const [searchValue, setSearchValue] = useState("");

  const onInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (handleSearch) {
      handleSearch(value); // Call the provided function with the current input value
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && handleSearch) {
      handleSearch(searchValue); // Trigger search on pressing Enter
    }
  };

  return (
    <div className="flex items-center w-full p-2 border  rounded-md shadow-sm max-w-[400px]">
      <input
        type="text"
        value={searchValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="flex-grow outline-none px-2 py-1 text-sm text-gray-700 font-Polysans"
      />
    </div>
  );
};

export default SearchComponent;
