import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Shift } from '../models';
import { Auth } from '@aws-amplify/auth';

export default function Shifts() {
  const [shifts, updateShifts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchShifts();
    fetchCurrentUser();
    const subscription = DataStore.observe(Shift).subscribe(() =>
      fetchShifts()
    );
    return () => subscription.unsubscribe();
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

  // Function to format the date as "Day, Month Date, Year"
  function formatDate(dateString) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // Format the date without the comma after the day
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate.replace(/,\s*/, ' '); // Remove the comma and any following whitespace
  }

  function getStatusCircleClass(isOpen) {
    return isOpen ? 'bg-green-600 rounded-full p-2' : 'bg-red-600';
  }

  return (
    <div className='container'>
      <p className='text-center text-3xl mt-4'>Shifts List</p>
      <table className='table-auto mx-auto mt-2'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {shifts
            .filter((shift) => shift.owner === currentUser) // Filter stores for the current user
            .map((shift) => (
              <tr key={shift.id}>
                <td>{formatDate(shift.start_time)}</td>
                <td className='items-center text-center'>
                  <div className='text-center flex justify-center align-middle h-full'>
                    <button
                      className={getStatusCircleClass(shift.is_open)}
                    ></button>
                  </div>
                </td>
                <td>
                  <button>Details</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
