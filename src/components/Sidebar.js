import { NavLink } from "react-router-dom";

const SideBar = ({ setcloseSidebar, closeSidebar }) => {
  return (
    <>
      <div className="bg-black opacity-50 absolute h-[100vh] xl:hidden block w-full "></div>
      <aside className="h-[100vh] bg-white shadow-md p-4 xl:fixed  absolute  w-[220px] ">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h3 className="font-Inter text-[#0d0c22] xl:text-[24px] text-[14px] font-bold">
              S/ZAKARIYAH
            </h3>

            <svg
              onClick={() => {
                setcloseSidebar(false);
              }}
              className="xl:hidden block"
              xmlns="http://www.w3.org/2000/svg"
              height="22px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-2 font-Polysans text-sm">
              <NavLink
                to="/panel/dashboard"
                className={({ isActive }) =>
                  `text-[#0d0c22] ${isActive ? "active font-bold" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </div>
            <div className="p-2 font-Polysans text-sm">
              <NavLink
                to="/panel/beneficiaries"
                className={({ isActive }) =>
                  `text-[#0d0c22] ${
                    isActive ? "active font-bold w-full block" : "w-full"
                  }`
                }
              >
                Beneficiaries
              </NavLink>
            </div>
            <div className="p-2 font-Polysans text-sm">
              <NavLink
                to="/panel/reports"
                className={({ isActive }) =>
                  `text-[#0d0c22] ${isActive ? "active font-bold" : ""}`
                }
              >
                Payments record
              </NavLink>
            </div>
            <div className="p-2 font-Polysans text-sm  ">
              <NavLink
                to="/panel/settings"
                className={({ isActive }) =>
                  `text-[#0d0c22] ${isActive ? "active font-bold" : ""}`
                }
              >
                Settings
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
