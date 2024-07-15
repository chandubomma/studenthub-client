import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import GuideList from './GuideList';

const Guide = () => {
  const location = useLocation();

  return (
    <div className="container mx-auto p-4 flex">
      <aside className="w-1/4 bg-gray-100 p-4 rounded shadow-md">
        <nav>
          <Link to="list" className="block mb-2 text-blue-500 hover:underline">Guides List</Link>
          <Link to="requests" className="block mb-2 text-blue-500 hover:underline">Meeting Requests</Link>
          <Link to="meetings" className="block mb-2 text-blue-500 hover:underline">Meetings</Link>
        </nav>
      </aside>
      <main className="w-3/4 p-4">
        {location.pathname === '/guide/list' ? (
          <GuideList/>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Guide;
