import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import { Link } from "@remix-run/react";
// import storage from "local-storage-fallback";
// import Logo from '../images/logo/logo.svg';
// import SidebarLinkGroup from "./SidebarLinkGroup";
import { HamburgerSvg } from "../images/svg/svgComponents";
import DashboardSubMenu from "~/components/SubMenus/DashboardMenu";
import OrgDashboardSubMenu from "~/components/SubMenus/OrgDashboardMenu";
import ProjectSubMenu from "~/components/SubMenus/ProjectMenu";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}



const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

  //Logic for sidebar sub menus
  //Case MUST match part of the Route.
  const location = useLocation();
  const { pathname } = location;
  
  let Menu;
  let pathSegments = pathname.split("/");
  
  switch (pathSegments[1]) {
    case 'dashboard':
      Menu = DashboardSubMenu;
      break;
    case 'auth':
    case 'organization-dashboard':
      if (pathSegments[3] === 'projects') {
        Menu = ProjectSubMenu;
      } else {
        Menu = OrgDashboardSubMenu;
      }
      break;
    default:
      Menu = () => null;
  }
  


  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <p className="text-3xl">TaskMaster</p>
          {/* <img src={Logo} alt="Logo" /> */}
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <HamburgerSvg />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
  
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            {/* Add Sub Menus here */}
          <Menu sidebarOpen={false} setSideBarOpen={function (arg: boolean): void {
              throw new Error("Function not implemented.");
            } } />
          </div>
        </nav>
     
      </div>
    </aside>
  );
};

export default Sidebar;
