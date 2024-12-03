import React, { useState } from "react";
import TableCell from "./tableCell";
import TableHeader from "./tableHeader";
import Pagination from "../pagination";
import axiosInstance from "../../api/axiosInstance";

const AdminTable = ({
  headers,
  data,
  onRecordPayment,
  rowsPerPage = 5,
  updateStatus,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full overflow-x-auto parent-scroll">
      <table className="min-w-full border-collapse border border-gray-300 flex-shrink-0">
        <TableHeader headers={headers} />
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>

              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone_number}</TableCell>
              <TableCell>
                {new Date(row.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => updateStatus(row.status, row.id)}
                  className={`bg-[#0d0c22] text-white px-4 py-1 rounded-md text-sm hover:bg-[#0d0c22] font-normal`}
                >
                  {row.status === null ||
                  row.status === "disabled" ||
                  row.status === undefined ||
                  row.status === ""
                    ? "Activate"
                    : "Disable"}{" "}
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

export default AdminTable;
