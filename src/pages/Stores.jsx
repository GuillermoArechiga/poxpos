import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Store } from '../models';
import NewStoreModal from '../components/StoreModal';
import { Auth } from '@aws-amplify/auth';

export default function Stores() {
  const [stores, updateStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchStores();
    const subscription = DataStore.observe(Store).subscribe(() => fetchStores());
    return () => subscription.unsubscribe();
  }, []);

  async function fetchStores() {
    const stores = await DataStore.query(Store);
    updateStores(stores);
  }

  async function deleteStore(storeId) {
    try {
      await DataStore.delete(Store, storeId);
      console.log('Store deleted successfully!', storeId);
      await fetchStores();
    } catch (error) {
      console.log('Error deleting store', error);
    }
  }

  const handleCreateOrUpdateStore = async (formData) => {
    if (!formData.name) return;
    try {
      const user = await Auth.currentAuthenticatedUser(); // Get the current user
  
      if (editData) {
        // If editData is available, update the store
        await DataStore.save(Store.copyOf(editData, (updated) => {
          updated.name = formData.name;
          updated.owner = user.username; // Set the owner to the current user's username
        }));
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
    <div className="container">
      <h1 className="h1">Stores</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setShowModal(true);
          setEditData(null); // Clear editData to create a new store
        }}
      >
        New Store
      </button>
      {showModal && (
        <NewStoreModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateOrUpdateStore}
          onUpdate={handleCreateOrUpdateStore}
          initialData={editData}
        />
      )}
      {stores.map((store) => (
        <div key={store.id}>
          <div onClick={() => {
            setShowModal(true);
            setEditData(store); // Set editData for editing
          }}>
            <p>{store.name}</p>
          </div>
          <button onClick={() => deleteStore(store.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}