import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function Main() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className=' '>
           <Outlet />
      </div>
    </div>
  );
}

export default Main;
