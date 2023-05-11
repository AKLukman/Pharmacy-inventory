import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About/About";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
// import AllMedicine from "../../Pages/Medicine/AllMedicine/AllMedicine";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import DashboardLayout from "../../Layout/DashboardLayout";
import Myappointment from "../../Pages/Dashboard/MyAppointment/Myappointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDcotor/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import StokeStore from "../../Pages/MedicineStore/StokeStore/StokeStore";
import StokeMedicineDetails from "../../Pages/MedicineStore/StokeStore/StokeMedicineDetails";
import TunstallStore from "../../Pages/MedicineStore/TunstallStore/TunstallStore";
import TunstallMedicineDetails from "../../Pages/MedicineStore/TunstallStore/TunstallMedicineDetails";
import FentonStore from "../../Pages/MedicineStore/FentonStore/FentonStore";
import FentonMedicineDetails from "../../Pages/MedicineStore/FentonStore/FentonMedicineDetails";
import HanleyStore from "../../Pages/MedicineStore/HanleyStore/HanleyStore";
import HanleyMedicineDetails from "../../Pages/MedicineStore/HanleyStore/HanleyMedicineDetails";
import LongtonStore from "../../Pages/MedicineStore/LongtonStore/LongtonStore";
import LongtonMedicineDetails from "../../Pages/MedicineStore/LongtonStore/LongtonMedicineDetails";
import Sales from "../../Pages/Dashboard/Sales/Sales";
import StuffRoute from "../StuffRoute/StuffRoute";

import AddUsers from "../../Pages/Dashboard/AddUsers/AddUsers";
import ManageUser from "../../Pages/Dashboard/ManageUser/ManageUser";
import ManageMedicine from "../../Pages/Dashboard/ManageMedicine/ManageMedicine";

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
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
      { path: "/about", element: <About></About> },
      // {
      //   path: "/allmedicine",
      //   element: <AllMedicine></AllMedicine>,
      // },

      // stoke store
      {
        path: "/stoke-store",
        element: <StokeStore></StokeStore>,
      },

      {
        path: "/stoke-store/:id",
        element: <StokeMedicineDetails></StokeMedicineDetails>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/api/v1/pharmacy/stock-store-id-check-not-required/${params.id}`
          ),
      },

      // tunstall store
      {
        path: "/tunstall-store",
        element: <TunstallStore></TunstallStore>,
      },
      {
        path: "/tunstall-store/:id",
        element: <TunstallMedicineDetails></TunstallMedicineDetails>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/api/v1/pharmacy/tunstall-store/${params.id}`
          ),
      },

      // fenton store
      {
        path: "/fenton-store",
        element: <FentonStore></FentonStore>,
      },
      {
        path: "/fenton-store/:id",
        element: <FentonMedicineDetails></FentonMedicineDetails>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/api/v1/pharmacy/fenton-store/${params.id}`
          ),
      },

      // Hanley Store
      {
        path: "/hanley-store",
        element: <HanleyStore></HanleyStore>,
      },
      {
        path: "/hanley-store/:id",
        element: <HanleyMedicineDetails></HanleyMedicineDetails>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/api/v1/pharmacy/hanley-store/${params.id}`
          ),
      },
      // Longton store
      {
        path: "/longton-store",
        element: <LongtonStore></LongtonStore>,
      },
      {
        path: "/longton-store/:id",
        element: <LongtonMedicineDetails></LongtonMedicineDetails>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/api/v1/pharmacy/longton-store/${params.id}`
          ),
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
            path: "/dashboard/sales",
            element: (
              <AdminRoute>
                <Sales></Sales>
              </AdminRoute>
            ),
            element: (
              <StuffRoute>
                <Sales></Sales>
              </StuffRoute>
            ),
          },
          {
            path: "/dashboard/allusers",
            element: (
              <AdminRoute>
                <AllUsers></AllUsers>
              </AdminRoute>
            ),
            element: (
              <StuffRoute>
                <AllUsers></AllUsers>
              </StuffRoute>
            ),
          },
          {
            path: "/dashboard/add-doctor",
            element: (
              <AdminRoute>
                <AddDoctor></AddDoctor>
              </AdminRoute>
            ),
            element: (
              <StuffRoute>
                <AddDoctor></AddDoctor>
              </StuffRoute>
            ),
          },
          {
            path: "/dashboard/manage-doctors",
            element: (
              <AdminRoute>
                <ManageDoctors></ManageDoctors>
              </AdminRoute>
            ),
            element: (
              <StuffRoute>
                <ManageDoctors></ManageDoctors>
              </StuffRoute>
            ),
          },
          {
            path: "/dashboard/pharmacy-user-registation",
            element: (
              <AdminRoute>
                <AddUsers></AddUsers>
              </AdminRoute>
            ),
            element: (
              <StuffRoute>
                <AddUsers></AddUsers>
              </StuffRoute>
            ),
          },
          {
            path: "/dashboard/manage-user",
            element: (
              <AdminRoute>
                <ManageUser></ManageUser>
              </AdminRoute>
            ),
            element: (
              <StuffRoute>
                <ManageUser></ManageUser>
              </StuffRoute>
            ),
          },
          {
            path: "/dashboard/all-medicine",
            element: (
              <AdminRoute>
                <ManageMedicine></ManageMedicine>
              </AdminRoute>
            ),
            element: (
              <StuffRoute>
                <ManageMedicine></ManageMedicine>
              </StuffRoute>
            ),
          },
        ],
      },
    ],
  },
]);
