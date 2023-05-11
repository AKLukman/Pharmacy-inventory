import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSutff from "../hooks/useStuff";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isStuff] = useSutff(user?.email);

  return (
    <div>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content">
            {isAdmin && (
              <>
                {" "}
                <li>
                  <Link to="/dashboard/sales">All Sales</Link>
                </li>
                <li>
                  <Link to="/dashboard/allusers">All Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/add-doctor">Add doctor</Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-doctors">Manage doctors</Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-user">Manage User</Link>
                </li>
                <li>
                  <Link to="/dashboard/all-medicine">All Medicine</Link>
                </li>
              </>
            )}
            {isStuff && (
              <>
                {" "}
                <li>
                  <Link to="/dashboard/sales">All Sales</Link>
                </li>
                <li>
                  <Link to="/dashboard/allusers">All Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/add-doctor">Add doctor</Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-doctors">Manage doctors</Link>
                </li>
                <li>
                  <Link to="/dashboard/pharmacy-user-registation">
                    Add User
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-user">Manage User</Link>
                </li>
                <li>
                  <Link to="/dashboard/all-medicine">Manage Medicine</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/dashboard">My Appointments</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
