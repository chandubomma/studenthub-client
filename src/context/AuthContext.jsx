import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios.get('http://localhost:3000/api/auth/user', {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then(response => {
        setUser(response.data);
        console.log(response.data);
        setLoading(false); // Set loading to false after successful request
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false); // Set loading to false after failed request
      });
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
