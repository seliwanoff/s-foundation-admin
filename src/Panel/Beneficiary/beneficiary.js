import { useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import YearSelection from "../../components/yeareelction";
import FilterDropdown from "../../components/filterComponent";
import Table from "../../components/table/table";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";

const BeneficiaryWrapper = () => {
  const [searchResult, setSearchResult] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedYear, setselectedYear] = useState(new Date().getFullYear());
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearch = (query) => {
    setSearchResult(query);
  };

  const downloadPDF = async (type) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/download-pdf",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Adjust based on the response type
    } catch (error) {
      console.error("Error fetching the PDF:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await axiosInstance
        .get(
          `/admin/users?search=${searchResult}&year=${selectedYear}&page=${currentPage}${
            selectedFilter === "male"
              ? "&sex=male"
              : selectedFilter === "female"
              ? "&sex=female"
              : selectedFilter === "account_number"
              ? "&has_account_number"
              : "&is_disable"
          }`
        )
        .then((res) => {
          console.log(res);
          setpageCount(res.data.data.total);
          setUsers(res.data.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, [searchResult, currentPage, selectedFilter]);
  const headers = [
    "Name",
    "Phone number",
    "Gender",
    "Occupation",
    "Amount asked",
    "DOB",
    "Date",
    "created_by",
    "Action",
  ];

  const handleRecordPayment = (row) => {
    navigates("/panel/user/profile", { state: { row } });
  };

  const filterOptions = ["Account Number", "Male", "Female", "Disability"];

  const handleFilterChange = (filter) => {
    setSelectedFilter(
      filter.filter === "Male"
        ? "male"
        : filter.filter === "Female"
        ? "female"
        : filter.filter === "Account Number"
        ? "account_number"
        : "is_disable"
    );
  };
  const navigates = useNavigate();
  return (
    <div className="flex flex-col gap-6 mt-2 p-4">
      <div className="bg-white shadow-md w-full rounded-md p-4">
        <div className="flex justify-between items-center">
          <button
            className="bg-[#0d0c22] text-white px-4 py-1 rounded-md h-[46px] justify-center items-center text-sm hover:bg-[#0d0c22]  mb-6 flex font-Polysans font-bold"
            onClick={() => navigates("/panel/add-beneficiary")}
          >
            Add Beneficiary
          </button>

          <div className="flex gap-4">
            <a
              className="bg-[#0d0c22] text-white px-4 py-1 rounded-md h-[46px] justify-center items-center text-sm hover:bg-[#0d0c22]  mb-6 flex font-Polysans font-bold"
              href="http://127.0.0.1:8000/api/users/download-pdf"
            >
              PDF
            </a>
            <button
              className="bg-[#0d0c22] text-white px-4 py-1 rounded-md h-[46px] justify-center items-center text-sm hover:bg-[#0d0c22]  mb-6 flex font-Polysans font-bold"
              onClick={() => downloadPDF("excel")}
            >
              EXCEL
            </button>
          </div>
        </div>
        {selectedFilter !== "" && (
          <div className="flex gap-4 font-Polysans text-[24px] py-0 border border-gray-400 rounded-md w-fit px-3 my-2">
            <span className="text-[14px]">
              {selectedFilter} : {pageCount}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-5">
          <SearchComponent
            handleSearch={handleSearch}
            placeholder="Search for something..."
          />
          <div className=" flex items-center gap-4">
            <span>Filter :</span>
            <YearSelection setselectedYear={setselectedYear} />
            <FilterDropdown
              options={filterOptions}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="w-full">
            <Table
              headers={headers}
              data={users}
              setCurrentPages={setCurrentPage}
              total={pageCount}
              onRecordPayment={handleRecordPayment}
              rowsPerPage={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryWrapper;
