import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import Header from "./heade";

const Layout = () => {
  const [closeSidebar, setcloseSidebar] = useState(false);
  return (
    <div className="flex">
      {closeSidebar && (
        <SideBar
          setcloseSidebar={setcloseSidebar}
          closeSidebar={closeSidebar}
        />
      )}

      <main
        className={`  ${
          closeSidebar && "xl:ml-[220px]"
        }  w-full bg-gray-100 min-h-[100vh]`}
      >
        <Header setcloseSidebar={setcloseSidebar} closeSidebar={closeSidebar} />

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
