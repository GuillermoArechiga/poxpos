import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Stores from './pages/Stores';
import Dashboard from './pages/Dashboard';
import Registration from './pages/RegisterPage';
import Login from './pages/LogInPage';
import Navbar from './components/Navigation';
import ErrorPage404 from './pages/ErrorPage404';
import Items from './pages/Items';
import Categories from './pages/Category';
import Pos from './pages/Pos';

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
        <Route
          path='/login'
          element={
            <Login
              element={
                isAuthenticated ? <Navigate to='/dashboard' /> : <Login />
              }
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path='/register'
          element={
            isAuthenticated ? <Navigate to='/dashboard' /> : <Registration />
          }
        />
        <Route
          path='/dashboard'
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path='/items'
          element={isAuthenticated ? <Items /> : <Login />}
        />
        <Route
          path='/stores'
          element={isAuthenticated ? <Stores /> : <Login />}
        />
        <Route
          path='/category'
          element={isAuthenticated ? <Categories /> : <Login />}
        />
        <Route
          path='/pos'
          element={isAuthenticated ? <Pos /> : <Login />}
        />
        <Route path='*' element={<ErrorPage404 />} />
      </Routes>
    </Router>
  );
}
