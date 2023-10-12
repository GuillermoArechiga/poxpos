import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Shift } from '../models';
import { Auth } from '@aws-amplify/auth';
import ShiftModalC from '../components/ShiftModalC';

export default function ShiftC() {
  const [shifts, updateShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchShift();
    const subscription = DataStore.observe(Shift).subscribe(() => fetchShift());
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

  async function fetchShift() {
    const shifts = await DataStore.query(Shift);
    updateShifts(shifts);
  }

  async function deleteShift(storeId) {
    try {
      await DataStore.delete(Shift, storeId);
      console.log('Shift deleted successfully!', storeId);
      await fetchShift();
    } catch (error) {
      console.log('Error deleting shift', error);
    }
  }

  const handleCreateOrUpdateShift = async (formData) => {
    if (!formData.start_time) return;
    try {
      const user = await Auth.currentAuthenticatedUser();

      if (editData) {
        // If editData is available, update the shift
        const updatedShift = Shift.copyOf(editData, (updated) => {
          updated.start_time = formData.start_time;
          updated.end_time = new Date().toISOString();
        });

        await DataStore.save(updatedShift);
        console.log('Shift updated successfully!', updatedShift);
        setEditData(null); // Clear editData
      } else {
        // Otherwise, create a new shift with the current user as the owner
        const newShift = new Shift({
          ...formData,
          owner: user.username,
          end_time: new Date().toISOString(),
        });
        await DataStore.save(newShift);
        console.log('Shift created successfully!', newShift);
      }

      setShowModal(false);
      await fetchShift();
    } catch (error) {
      console.log('Error saving/updating shift', error);
    }
  };

  return (
    <div className='container'>
      <p className='text-center text-3xl mt-4'>Shifts</p>
      <div className='text-center mt-3'>
        <button
          className='bg-blue-500 text-white px-4 py-1 rounded'
          onClick={() => {
            setShowModal(true);
            setEditData(null); // Clear editData to create a new store
          }}
        >
          New Shift
        </button>
      </div>
      {showModal && (
        <ShiftModalC
          onClose={() => setShowModal(false)}
          onCreate={handleCreateOrUpdateShift}
          onUpdate={handleCreateOrUpdateShift}
          onDelete={(shiftId) => deleteShift(shiftId)} // Pass the deleteStore function here
          initialData={editData}
        />
      )}
      <div className='grid md:grid-cols-4 gap-4 p-6'>
        {shifts
          .filter((shift) => shift.owner === currentUser) // Filter stores for the current user
          .map((shift) => (
            <div className='rounded border p-3 shadow-xl' key={shift.id}>
              <div
                className='text-center w-100'
                onClick={() => {
                  setShowModal(true);
                  setEditData(shift); // Set editData for editing
                }}
              >
                <div className='py-2'>{shift.start_time}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
