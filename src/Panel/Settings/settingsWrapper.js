import { useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import YearSelection from "../../components/yeareelction";
import FilterDropdown from "../../components/filterComponent";
import Table from "../../components/table/table";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import AdminTable from "../../components/table/AdminTable";
import { fetchUserData } from "../../slice/AuthSlice";

const SettingsWrapper = () => {
  const [searchResult, setSearchResult] = useState("");
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);

  const handleSearch = (query) => {
    console.log("Search Query:", query);
    setSearchResult(query);
  };

  useEffect(() => {
    const AdminProfile = async () => {
      await axiosInstance.get("/admin/profile").then((res) => {
        //   console.group(res);
        setAdmin(res.data.data);
      });
    };
    AdminProfile();
  }, []);
  const fetchUser = async () => {
    await axiosInstance
      .get(`/admin/all?search=${searchResult}`)
      .then((res) => {
        // console.log(res);
        setUsers(res.data.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchUser();
  }, [searchResult]);
  const headers = [
    "First Name",
    "Last Name ",
    "Email",
    "Phone Number",
    "Date",
    "Action",
  ];

  const [selectedFilter, setSelectedFilter] = useState("");

  const filterOptions = ["Account Number", "Age", "Gender", "Location"];

  const handleFilterChange = (filter) => {
    console.log("Selected Filter:", filter);
    setSelectedFilter(filter);
  };
  const updateStatus = async (status, id) => {
    await axiosInstance
      .post(`/admin/update-status`, {
        status: status === "active" ? "disabled" : "active",
        admin_id: id,
      })
      .then((res) => {
        fetchUser();
        console.log(res);
        alert("Admin status changed successfully");
      })
      .catch((e) => {
        alert((e.response && e?.response?.data?.message) || null);
      });
  };
  const navigates = useNavigate();
  return (
    <div className="flex flex-col gap-6 mt-2 p-4">
      <div className="bg-white shadow-md w-full rounded-md p-4">
        {admin.email === "borlerjy@gmail.com" && (
          <button
            className="bg-[#0d0c22] text-white px-4 py-1 rounded-md h-[46px] justify-center items-center text-sm hover:bg-[#0d0c22]  mb-6 flex font-Polysans font-bold"
            onClick={() => navigates("/panel/add-admin")}
          >
            Add Admin
          </button>
        )}
        <div className="flex items-center justify-between flex-wrap gap-5">
          <SearchComponent
            handleSearch={handleSearch}
            placeholder="Search for something..."
          />

          <div className="w-full">
            <AdminTable
              headers={headers}
              data={users}
              updateStatus={updateStatus}
              // onRecordPayment={handleRecordPayment}
              rowsPerPage={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWrapper;
