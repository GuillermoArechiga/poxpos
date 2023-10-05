import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Category } from '../models';
import CategoryModal from '../components/CategoryModal';
import { Auth } from '@aws-amplify/auth';

export default function Categories() {
  const [categories, updateCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchCategories();
    const subscription = DataStore.observe(Category).subscribe(() =>
      fetchCategories()
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

  async function fetchCategories() {
    const categories = await DataStore.query(Category);
    updateCategories(categories);
  }

  async function deleteCategory(categoryId) {
    try {
      await DataStore.delete(Category, categoryId);
      console.log('Category deleted successfully!', categoryId);
      await fetchCategories();
    } catch (error) {
      console.log('Error deleting category', error);
    }
  }

  const handleCreateOrUpdateCategory = async (formData) => {
    if (!formData.name) return;
    try {
      const user = await Auth.currentAuthenticatedUser(); // Get the current user

      if (editData) {
        // If editData is available, update the store
        await DataStore.save(
          Category.copyOf(editData, (updated) => {
            updated.name = formData.name;
            updated.owner = user.username; // Set the owner to the current user's username
          })
        );
        console.log('Category updated successfully!', formData);
        setEditData(null); // Clear editData
      } else {
        // Otherwise, create a new store with the current user as the owner
        await DataStore.save(
          new Category({ ...formData, owner: user.username })
        );
        console.log('Store created successfully!', formData);
      }

      setShowModal(false);
      await fetchCategories();
    } catch (error) {
      console.log('Error saving/updating category', error);
    }
  };

  return (
    <div className='container'>
      <p className='text-center text-3xl mt-4'>Categories</p>
      <div className='text-center mt-3'>
        <button
          className='bg-blue-500 text-white px-4 py-1 rounded'
          onClick={() => {
            setShowModal(true);
            setEditData(null); // Clear editData to create a new store
          }}
        >
          New Category
        </button>
      </div>
      {showModal && (
        <CategoryModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateOrUpdateCategory}
          onUpdate={handleCreateOrUpdateCategory}
          onDelete={(categoryId) => deleteCategory(categoryId)} // Pass the deleteStore function here
          initialData={editData}
        />
      )}
      <div className='grid md:grid-cols-4 gap-4 p-6'>
        {categories
          .filter((category) => category.owner === currentUser) // Filter stores for the current user
          .map((category) => (
            <div className='rounded border p-3 shadow-xl' key={category.id}>
              <div
                className='text-center w-100'
                onClick={() => {
                  setShowModal(true);
                  setEditData(category); // Set editData for editing
                }}
              >
                <div className='py-2'>{category.name}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
