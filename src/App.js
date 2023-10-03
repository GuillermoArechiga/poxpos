import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Stores from './pages/Stores';
import Dashboard from './pages/Dashboard';
import Registration from './pages/RegisterPage';
import Login from './pages/LogInPage';
import Navbar from './components/Navigation';
import ErrorPage404 from './pages/ErrorPage404';


import { Auth } from 'aws-amplify';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated using Amplify Auth
    Auth.currentAuthenticatedUser()
      .then(() => {
        setIsAuthenticated(true); // User is authenticated
      })
      .catch(() => {
        setIsAuthenticated(false); // User is not authenticated
      });
  }, []);

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
      <Route path='/login' element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path='/register' element={<Registration />} />

        <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path='/stores' element={isAuthenticated ? <Stores /> : <Navigate to="/login" />} />

        {/* Redirect to 404 for unknown routes */}
        <Route path='*' element={<ErrorPage404 />} /><Route path='*' element={<ErrorPage404 />} />
      </Routes>
    </Router>
  );
}
