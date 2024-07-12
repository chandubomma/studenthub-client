import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import Guide from './pages/Guide';
import GuidesList from './pages/GuideList';
import MeetingRequests from './pages/MeetingRequests';
import Meetings from './pages/Meetings';
import MeetingRoom from './pages/MeetingRoom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import About from './pages/About';
import ProtectedRoute from './components/navigation/ProtectedRoute';
import AuthProvider from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />}>
            <Route path="list" element={<GuidesList />} />
            <Route path="requests" element={<ProtectedRoute><MeetingRequests /></ProtectedRoute>} />
            <Route path="meetings" element={<ProtectedRoute><Meetings /></ProtectedRoute>} />
            <Route path="meeting/:id" element={<ProtectedRoute><MeetingRoom /></ProtectedRoute>} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
        </Routes>
    </AuthProvider>
  );
};

export default App;
