import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const MedicineLayout = () => {
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/medicine">Stoke</Link>
            </li>
            <li>
              <Link to="/medicine/tunstall">Tunstall</Link>
            </li>
            <li>
              <Link to="/medicine/fenton">Fenton</Link>
            </li>
            <li>
              <Link to="/medicine/hanley">Hanley</Link>
            </li>
            <li>
              <Link to="/medicine/longton">Longton</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedicineLayout;
