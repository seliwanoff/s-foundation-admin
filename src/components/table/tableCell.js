import React from "react";

const TableCell = ({ children }) => {
  return (
    <td className="px-4 py-2 border text-sm text-gray-800 font-Inter  text-nowrap ">
      {children}
    </td>
  );
};

export default TableCell;
