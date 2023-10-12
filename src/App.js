import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Shift } from './models/';
import HomePage from './pages/Home';
import Navbar from './components/Navigation';
import ErrorPage404 from './pages/ErrorPage404';
import Dashboard from './pages/Dashboard';
import Registration from './pages/RegisterPage';
import Login from './pages/LogInPage';
import Items from './pages/Items';
import Categories from './pages/Category';
import Pos from './pages/Pos';
import ShiftOpen from './pages/ShiftOpen';
import ShiftC from './pages/Shiftcopy';
import Stores from './pages/Stores';
import { AuthProvider, useAuth } from './components/AuthContext';

function PrivateRoute({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  const [shifts, updateShifts] = useState([]);
  const { isAuthenticated } = useAuth(); // Use useAuth hook to access isAuthenticated


  useEffect(() => {
    async function fetchShifts() {
      try {
        const shifts = await DataStore.query(Shift);
        updateShifts(shifts);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    }
    fetchShifts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/items' element={<PrivateRoute><Items /></PrivateRoute>} />
        <Route path='/stores' element={<PrivateRoute><Stores /></PrivateRoute>} />
        <Route path='/category' element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path='/pos' element={<PrivateRoute>{shifts.some((shift) => shift.is_open) ? <Pos /> : <ShiftOpen />}</PrivateRoute>} />
        <Route path='/open_shift' element={<PrivateRoute>{!shifts.some((shift) => shift.is_open) ? <ShiftOpen /> : <Navigate to='/dashboard' />}</PrivateRoute>} />
        <Route path='/shifts' element={<PrivateRoute><ShiftC /></PrivateRoute>} />
        <Route path='*' element={<PrivateRoute><ErrorPage404 /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

function Main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Main;
