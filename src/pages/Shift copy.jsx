import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Shift } from '../models';
import { Auth } from '@aws-amplify/auth';

export default function Stores() {
  const [stores, updateStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentShift();
    fetchShift();
    const subscription = DataStore.observe(Shift).subscribe(() =>
      fetchShift()
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

  async function fetchShift() {
    const stores = await DataStore.query(Shift);
    updateStores(stores);
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
    if (!formData.name) return;
    try {
      const user = await Auth.currentAuthenticatedUser(); // Get the current user

      if (editData) {
        // If editData is available, update the store
        await DataStore.save(
          Store.copyOf(editData, (updated) => {
            updated.name = formData.name;
            updated.owner = user.username; // Set the owner to the current user's username
          })
        );
        console.log('Store updated successfully!', formData);
        setEditData(null); // Clear editData
      } else {
        // Otherwise, create a new store with the current user as the owner
        await DataStore.save(new Store({ ...formData, owner: user.username }));
        console.log('Store created successfully!', formData);
      }

      setShowModal(false);
      await fetchStores();
    } catch (error) {
      console.log('Error saving/updating store', error);
    }
  };

  return (
    <div className='container'>
      <p className='text-center text-3xl mt-4'>Stores</p>
      <div className='text-center mt-3'>
        <button
          className='bg-blue-500 text-white px-4 py-1 rounded'
          onClick={() => {
            setShowModal(true);
            setEditData(null); // Clear editData to create a new store
          }}
        >
          New Store
        </button>
      </div>
      {showModal && (
        <NewStoreModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateOrUpdateStore}
          onUpdate={handleCreateOrUpdateStore}
          onDelete={(storeId) => deleteStore(storeId)} // Pass the deleteStore function here
          initialData={editData}
        />
      )}
      <div className='grid md:grid-cols-4 gap-4 p-6'>
        {stores
          .filter((store) => store.owner === currentUser) // Filter stores for the current user
          .map((store) => (
            <div className='rounded border p-3 shadow-xl' key={store.id}>
              <div
                className='text-center w-100'
                onClick={() => {
                  setShowModal(true);
                  setEditData(store); // Set editData for editing
                }}
              >
                <div className='py-2'>{store.name}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
