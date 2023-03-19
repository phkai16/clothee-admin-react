import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
