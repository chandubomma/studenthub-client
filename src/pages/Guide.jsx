import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import GuideList from './GuideList';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/navigation/Footer';

const Guide = () => {

  return (  
      <div className="m-0 ">
        <div className="flex md:flex-row flex-col">
            <div className="md:lg:flex-[2] w-full">
              <Sidebar/>
            </div>
            <div className="md:flex-[11]">
              <Outlet />
            </div>
        </div>
    </div>
  );
};

export default Guide;
