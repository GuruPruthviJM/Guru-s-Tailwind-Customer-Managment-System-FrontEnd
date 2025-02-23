import React from 'react';
import { Header } from './components/NabBar/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Main content grows to fill the space and has a beige background */}
      <div className="flex-grow bg-[#f5f5dc]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
