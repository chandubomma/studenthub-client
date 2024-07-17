import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import GuideList from './GuideList';
import Sidebar from '../components/navigation/Sidebar';

const Guide = () => {

  return (  
      <div className="h-screen m-0 ">
        <div className="flex flex-row">
            <div className="lg:flex-[2]">
              <Sidebar/>
            </div>
            <div className="flex-[11] overflow-y-scroll">
              <Outlet />
            </div>
        </div>
    </div>
  );
};

export default Guide;
