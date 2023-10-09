import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Shift } from '../models';
import { Auth } from '@aws-amplify/auth';

export default function ShiftOpen() {
  const [shifts, updateShifts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [startCash, setStartCash] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const subscription = DataStore.observe(Shift).subscribe(() =>
      fetchShifts()
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function fetchCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user.username);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  async function fetchShifts() {
    try {
      const shifts = await DataStore.query(Shift);
      updateShifts(shifts);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    }
  }

  async function handleCreateShift() {
    if (!startCash) return;

    try {
      const user = await Auth.currentAuthenticatedUser();

      const newShift = {
        owner: user.username,
        start_time: new Date().toISOString(),
        is_open: true,
        start_cash: parseFloat(startCash),
      };

      // Save the new shift
      await DataStore.save(new Shift(newShift));
      console.log('Shift created successfully!', newShift);
      setStartCash('');

      window.location.reload();
      
      navigate('/pos')
    } catch (error) {
      console.log('Error creating shift', error);
    }
  }

  return (
    <div className='container'>
      <p className='text-center text-3xl mt-4'>Shifts</p>
      <div className='text-center mt-3'>
        <input
          type='number'
          placeholder='Start Cash'
          value={startCash}
          onChange={(e) => setStartCash(e.target.value)}
        />
        <button
          className='bg-blue-500 text-white px-4 py-1 rounded'
          onClick={handleCreateShift}
        >
          Save Shift
        </button>
      </div>
    </div>
  );
}
