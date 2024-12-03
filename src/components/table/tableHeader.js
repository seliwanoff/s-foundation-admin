import React from "react";

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className="px-4 py-2 text-left text-sm font-medium text-gray-700 font-Inter text-nowrap"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
