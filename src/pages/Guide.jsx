import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import GuideList from './GuideList';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/navigation/Footer';

const Guide = () => {

  return (  
      <div className="m-0 ">
        <div className="flex flex-row">
            <div className="lg:flex-[2]">
              <Sidebar/>
            </div>
            <div className="flex-[11]">
              <Outlet />
            </div>
        </div>
    </div>
  );
};

export default Guide;
