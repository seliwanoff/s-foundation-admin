import { useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import YearSelection from "../../components/yeareelction";
import FilterDropdown from "../../components/filterComponent";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import RecordTable from "./recordTable";

const RecordWrapper = () => {
  const [searchResult, setSearchResult] = useState("");
  const [users, setPayment] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearch = (query) => {
    console.log("Search Query:", query);
    setSearchResult(query);
  };

  useEffect(() => {
    const fetchPayment = async () => {
      await axiosInstance
        .get(
          `/admin/payments?year=${selectedYear}${
            selectedFilter &&
            `&payment_status= ${selectedFilter}${
              searchResult && `&name=${searchResult}`
            }`
          }`
        )
        .then((res) => {
          // console.log(res);
          setPayment(res.data.payments.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchPayment();
  }, [selectedFilter, selectedYear, searchResult]);
  const headers = [
    "Name",
    "Phone number",
    "Requested Amount",
    "Amount Paid",

    "Account Number",
    "Bank Name",

    "Date",
    "status",
  ];

  const handleRecordPayment = (row) => {
    navigates("/panel/user/profile", { state: { row } });
  };

  const filterOptions = ["Pending", "Paid"];

  const handleFilterChange = (filter) => {
    console.log("Selected Filter:", filter);
    setSelectedFilter(filter);
  };
  const navigates = useNavigate();
  return (
    <div className="flex flex-col gap-6 mt-2 p-4">
      <div className="bg-white shadow-md w-full rounded-md p-4">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <SearchComponent
            handleSearch={handleSearch}
            placeholder="Search for something..."
          />
          <div className=" flex items-center gap-4 text-nowrap">
            <span>Filter :</span>
            <YearSelection setselectedYear={setSelectedYear} />
            <FilterDropdown
              options={filterOptions}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="w-full">
            <RecordTable
              headers={headers}
              data={users}
              onRecordPayment={handleRecordPayment}
              rowsPerPage={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordWrapper;
