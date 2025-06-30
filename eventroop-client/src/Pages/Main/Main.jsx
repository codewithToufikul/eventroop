import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function Main() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className=' max-w-[1200px] mx-auto'>
           <Outlet />
      </div>
    </div>
  );
}

export default Main;
