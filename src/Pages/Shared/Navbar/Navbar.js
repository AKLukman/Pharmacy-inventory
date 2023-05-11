import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import { reload } from "firebase/auth";
import useSutff from "../../../hooks/useStuff";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [isAdmin] = useAdmin(user?.email);
  const [isStuff] = useSutff(user?.email);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        window.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const menuItems = (
    <>
      {" "}
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* {isAdmin && (
        <li>
          <Link to="/about">About</Link>
        </li>
      )} */}
      {user?.uid && (isStuff || isAdmin) ? (
        <>
          <div className="dropdown dropdown-hover mt-3 ">
            <label
              tabIndex={0}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor:ponter"
            >
              Medicine Store
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/stoke-store"}>Stoke store</Link>
              </li>
              <li>
                <Link to={"/tunstall-store"}>Tunstall store</Link>
              </li>
              <li>
                <Link to={"/fenton-store"}>Fenton store</Link>
              </li>
              <li>
                <Link to={"/hanley-store"}>Hanley Store</Link>
              </li>
              <li>
                <Link to={"/longton-store"}>Longton Store</Link>
              </li>
            </ul>
          </div>
        </>
      ) : (
        ""
      )}
      {user?.uid ? (
        <>
          <li>
            <Link to="/appointment">Appointment</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Log Out</button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          PharmaZeal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
