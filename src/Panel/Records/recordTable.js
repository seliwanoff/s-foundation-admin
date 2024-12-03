import React, { useState } from "react";
import TableHeader from "../../components/table/tableHeader";
import TableCell from "../../components/table/tableCell";
import Pagination from "../../components/pagination";

const RecordTable = ({ headers, data, onRecordPayment, rowsPerPage = 5 }) => {
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
              <TableCell>
                <div className="flex items-center gap-4">
                  {row.user.image !== null ? (
                    <img
                      src={`https://zakariyahfoundation.com.ng/api/storage/${row.user.image}`}
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
                  {row.user.surname} {row.user.firstname}
                </div>
              </TableCell>
              <TableCell>{row.user.phoneNumber}</TableCell>
              <TableCell>{row.amount_due}</TableCell>
              <TableCell>{row.amount_paid}</TableCell>

              <TableCell>{row.user.bank_account_number}</TableCell>
              <TableCell>{row.user.bank_name}</TableCell>

              <TableCell>
                {new Date(row.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{row.payment_status}</TableCell>
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

export default RecordTable;
