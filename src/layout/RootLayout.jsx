import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar></Navbar>
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
