import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import MedicineLayout from "../../Layout/MedicineLayout";
import About from "../../Pages/About/About/About";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import AllMedicine from "../../Pages/Medicine/AllMedicine/AllMedicine";
import Medicine from "../../Pages/Medicine/Medicine/Medicine";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Stoke from "../../Pages/Medicine/Stores/Stoke/Stoke";
import Tunstall from "../../Pages/Medicine/Stores/Tunstall/Tunstall";
import Fenton from "../../Pages/Medicine/Stores/Fenton/Fenton";
import Hanley from "../../Pages/Medicine/Stores/Hanley/Hanley";
import Longton from "../../Pages/Medicine/Stores/Longton/Longton";
import StokeMedicine from "../../Pages/Medicine/Stores/Stoke/StokeMedicine/StokeMedicine";
import StokNotIdCheck from "../../Pages/Medicine/Stores/Stoke/StokeNotIdCheck/StokeNotIdCheck";
import TunstallNotIdCheck from "../../Pages/Medicine/Stores/Tunstall/TunstallNotIdCheck/TunstallNotIdCheck";
import TunstallIdCheck from "../../Pages/Medicine/Stores/Tunstall/TunstallIdCheck/TunstallIdCheck";
import FentonNotIdCheck from "../../Pages/Medicine/Stores/Fenton/FentonNotIdCheck/FentonNotIdCheck";
import DashboardLayout from "../../Layout/DashboardLayout";
import Myappointment from "../../Pages/Dashboard/MyAppointment/Myappointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDcotor/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      { path: "/signup", element: <SignUp></SignUp> },
      {
        path: "/medicine",
        element: (
          <AdminRoute>
            <MedicineLayout></MedicineLayout>
          </AdminRoute>
        ),
        children: [
          // { path: "/medicine", element: <Medicine></Medicine> },
          { path: "/medicine", element: <Stoke></Stoke> },
          { path: "/medicine/tunstall", element: <Tunstall></Tunstall> },
          { path: "/medicine/fenton", element: <Fenton></Fenton> },
          { path: "/medicine/hanley", element: <Hanley></Hanley> },
          { path: "/medicine/longton", element: <Longton></Longton> },
        ],
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
      { path: "/about", element: <About></About> },
      {
        path: "/allmedicine",
        element: <AllMedicine></AllMedicine>,
      },
      {
        path: "/stoke-store",
        element: <StokeMedicine></StokeMedicine>,
      },
      {
        path: "/stoke-store-not-id-check",
        element: <StokNotIdCheck></StokNotIdCheck>,
      },
      {
        path: "/tunstall-store-not-id-check",
        element: <TunstallNotIdCheck></TunstallNotIdCheck>,
      },
      {
        path: "/tunstall-store-id-check",
        element: <TunstallIdCheck></TunstallIdCheck>,
      },
      {
        path: "/fenton-store-not-id-check",
        element: <FentonNotIdCheck></FentonNotIdCheck>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
          </PrivateRoutes>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Myappointment></Myappointment>,
          },
          {
            path: "/dashboard/allusers",
            element: (
              <AdminRoute>
                <AllUsers></AllUsers>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/add-doctor",
            element: (
              <AdminRoute>
                <AddDoctor></AddDoctor>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/manage-doctors",
            element: (
              <AdminRoute>
                <ManageDoctors></ManageDoctors>
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);
