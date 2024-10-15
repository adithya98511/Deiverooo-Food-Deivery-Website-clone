import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar2";
import Footer from "../components/Footer/Footer";

const Layout: FC = () => {
  return (
    <div className="layout-container">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
