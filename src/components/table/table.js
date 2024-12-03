import React, { useState } from "react";
import TableCell from "./tableCell";
import TableHeader from "./tableHeader";
import Pagination from "../pagination";

const Table = ({
  headers,
  data,
  onRecordPayment,
  rowsPerPage = 30,
  total,
  setCurrentPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(parseFloat(total) / 30);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPages(page);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full overflow-x-auto parent-scroll">
      <table className="min-w-full border-collapse border border-gray-300 flex-shrink-0">
        <TableHeader headers={headers} />
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              <TableCell>
                <div className="flex items-center gap-4">
                  {row.image !== null ? (
                    <img
                      src={`${row.image_url}`}
                      alt={`${row.surname}'s profile`}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <img
                      src={"https://via.placeholder.com/150"}
                      alt={`${row.surname}'s profile`}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  {row.surname} {row.firstname}
                </div>
              </TableCell>
              <TableCell>{row.phoneNumber}</TableCell>

              <TableCell>{row.sex}</TableCell>
              <TableCell>{row.occupation}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.dob}</TableCell>
              <TableCell>
                {new Date(row.created_at).toLocaleDateString()}{" "}
                {new Date(row.created_at).toLocaleTimeString()}
              </TableCell>
              <TableCell>{row.created_by}</TableCell>

              <TableCell>
                <button
                  onClick={() => onRecordPayment(row)}
                  className="bg-[#0d0c22] text-white px-4 py-1 rounded-md text-sm hover:bg-[#0d0c22] font-normal"
                >
                  Record
                </button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
