import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/guide/list" className="mr-4">Guides</Link>
          <Link to="/about" className="mr-4">About</Link>
        </div>
        <div>
          {user ? (
            <>
              <Link to="/account" className="mr-4">Account</Link>
              <button onClick={logout} className="mr-4">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="mr-4">Sign In</Link>
              <Link to="/signup" className="mr-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
