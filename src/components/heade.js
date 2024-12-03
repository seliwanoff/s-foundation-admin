import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../slice/AuthSlice";

const Header = ({ setcloseSidebar, closeSidebar }) => {
  const location = useLocation();

  const routeTitles = {
    "/panel/dashboard": "Dashboard",
    "/panel/beneficiaries": "Beneficiaries",
    "/panel/reports": "Reports",
    "/panel/settings": "Settings",
    "/panel/add-beneficiary": "Add Beneficiary",
    "/panel/capturing": "Capturing",
    "/panel/user/profile": "User Profile",
    "/panel/record": "Record Payment",
    "/panel/reports": "Payment Records",
    "/panel/settings": "Admin Settings",
    "/panel/add-admin": "Add admin",
  };

  const title = routeTitles[location.pathname] || "Default Title";

  const navigates = useNavigate();

  return (
    <div className="h-[56px] text-left flex items-center shadow-md bg-white p-4 gap-5 justify-between">
      <div className="flex items-center gap-5">
        {!closeSidebar && (
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => {
              setcloseSidebar(!closeSidebar);
            }}
          >
            menu
          </span>
        )}

        {closeSidebar && (
          <svg
            onClick={() => {
              setcloseSidebar(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        )}
        <span className="text-[16px] font-Polysans text-[#0d0c22]">
          {title}
        </span>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        className="cursor-pointer"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
        onClick={() => {
          logout();

          navigates("/");
        }}
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
      </svg>
    </div>
  );
};

export default Header;
