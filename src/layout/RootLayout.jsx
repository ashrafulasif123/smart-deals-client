import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar></Navbar>
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default RootLayout;
