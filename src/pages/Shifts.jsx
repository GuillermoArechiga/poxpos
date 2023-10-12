import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Shift } from '../models';
import { Auth } from '@aws-amplify/auth';
import ShiftModal from '../components/ShiftModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Shifts() {
  const [shifts, updateShifts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (shift) => {
    console.log('Selected Shift:', shift);
    setSelectedShift(shift);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedShift(null);
    setIsModalOpen(false);
  };

  async function handleShiftClose() {
    if (selectedShift) {
      try {
        const updatedShift = { ...selectedShift, is_open: false };
        console.log('Updated Shifts', updatedShift)
        await DataStore.save(
          Shift.copyOf(updatedShift, (original) => {
            original.is_open = false;
          })
        );
        fetchShifts(); // Refresh the shifts list
        closeModal(); // Close the modal
      } catch (error) {
        console.error('Error closing shift:', error);
      }
    }
  }

  return (
    <div className='container'>
      <p className='text-center text-3xl mt-4'>Shifts List</p>
      <table className='mx-auto mt-2'>
        <thead>
          <tr className='border-b-4 border-slate-500'>
            <th className='px-4 py-2'>Date</th>
            <th className='px-4 py-2'>Status</th>
            <th className='px-4 py-2'>Details</th>
          </tr>
        </thead>
        <tbody>
          {shifts
            .filter((shift) => shift.owner === currentUser) // Filter stores for the current user
            .map((shift) => (
              <tr key={shift.id}>
                <td className='px-4 py-2'>{formatDate(shift.start_time)}</td>
                <td className='items-center text-center px-4'>
                  <div className='text-center  px-4 flex justify-center align-middle h-full'>
                    <div className={getStatusCircleClass(shift.is_open)}></div>
                  </div>
                </td>
                <td>
                  <div className='px-4 w-full'>
                    <button
                      className='px-2 rounded w-full bg-yellow-500 text-center '
                      onClick={() => openModal(shift)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedShift && (
        <ShiftModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          shift={selectedShift}
          onUpdateShift={handleShiftClose}
        />
      )}
    </div>
  );
}
