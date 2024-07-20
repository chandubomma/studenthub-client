import React from 'react';
import { Toaster } from "sonner";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet
} from "react-router-dom";
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
import { AuthProvider } from './context/AuthContext';
import SocketProvider from './context/SocketContext';
import { matchPath } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  const pathsWithNavbar = ["/"];

  const showNavbar = pathsWithNavbar.some(path => matchPath(path, location.pathname));

  return (
    <React.Fragment>
      {showNavbar && <Navbar />}
      <Outlet />
      <Toaster position="bottom-center" richColors />
    </React.Fragment>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="guide" element={<Guide />}>
        <Route path="list" element={<GuidesList />} />
        <Route path="requests" element={<ProtectedRoute><MeetingRequests /></ProtectedRoute>} />
      </Route>
      <Route path="user"  element={<Guide/>}>
        <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="meetings" element={<ProtectedRoute><Meetings /></ProtectedRoute>} />
      </Route>
      <Route path="meeting/:id" element={<ProtectedRoute><MeetingRoom /></ProtectedRoute>} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="about" element={<About />} />
    </Route>
  </Routes>
);

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <AppRoutes />
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
