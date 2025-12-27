import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './public/Navbar';

const Layout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} {process.env.REACT_APP_SHOP_NAME || 'Our Shop'}. All rights reserved.</p>
          <p>Quality products, trusted service</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;