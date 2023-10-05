import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Item, Category, Store } from '../models'; // Import the Item, Category, and Store models
import ItemModal from '../components/ItemModal'; // Import the ItemModal component
import { Auth } from '@aws-amplify/auth';

export default function Items() {
  const [items, updateItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchCurrentUser();
    fetchItems();
    fetchCategoriesAndStores();
    const subscription = DataStore.observe(Item).subscribe(() => fetchItems());
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

  async function fetchItems() {
    const items = await DataStore.query(Item);
    updateItems(items);
  }

  async function fetchCategoriesAndStores() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const categoriesForUser = (await DataStore.query(Category)).filter(
        (category) => category.owner === user.username
      );
      const storesForUser = (await DataStore.query(Store)).filter(
        (store) => store.owner === user.username
      );
      setCategories(categoriesForUser);
      setStores(storesForUser);
    } catch (error) {
      console.error('Error fetching categories and stores:', error);
    }
  }

  async function deleteItem(itemId) {
    try {
      // Fetch the item to be deleted
      const itemToDelete = await DataStore.query(Item, itemId);

      // Create a new instance of Item without modifying references
      const updatedItem = Item.copyOf(itemToDelete, (draft) => {
        draft.owner = null; // Set the owner to null to disassociate it from the user
      });

      // Save the modified item (disassociating it from the user)
      await DataStore.save(updatedItem);

      console.log('Item reference deleted successfully!', itemId);
      await fetchItems();
    } catch (error) {
      console.log('Error deleting item reference', error);
    }
  }

  async function handleCreateOrUpdateItem(formData) {
    if (!formData.name) return;

    try {
      const user = await Auth.currentAuthenticatedUser();
      if (editData) {
        // If editData is available, update the item
        const updatedItem = Item.copyOf(editData, (updated) => {
          updated.name = formData.name;
          updated.cost_price = parseFloat(formData.cost_price); // Assign the validated number
          updated.sale_price = parseFloat(formData.sale_price); // Convert to a number
          updated.start_stock = parseFloat(formData.start_stock); // Convert to a number
          updated.stock = parseFloat(formData.stock); // Convert to a number
          updated.bar_code = formData.bar_code;
          updated.change_price = formData.change_price; // Convert to a number

          // Check if the category or store in the form data is not empty
          if (
            formData.categoryId !== null &&
            formData.categoryId !== undefined
          ) {
            updated.itemCategoryId = formData.categoryId;
          }
          if (formData.storeId !== null && formData.storeId !== undefined) {
            updated.itemStoreId = formData.storeId;
          }
        });

        // Check if any changes were made
        if (
          JSON.stringify(updatedItem) !== JSON.stringify(editData) ||
          (formData.categoryId !== null && formData.categoryId !== undefined) ||
          (formData.storeId !== null && formData.storeId !== undefined)
        ) {
          await DataStore.save(updatedItem);
          console.log('Item updated successfully!', formData);
          setEditData(null); // Clear editData
        } else {
          console.log('No changes were made.');
        }
      } else {
        // Otherwise, create a new item with the current user as the owner
        const newItem = new Item({
          name: formData.name,
          cost_price: parseFloat(formData.cost_price), // Assign the validated number
          sale_price: parseFloat(formData.sale_price), // Convert to a number
          start_stock: parseFloat(formData.start_stock), // Convert to a number
          stock: parseFloat(formData.stock), // Convert to a number
          bar_code: formData.bar_code,
          change_price: formData.change_price, // Convert to a number

          // Set category and store IDs only if they are not null or undefined
          itemCategoryId:
            formData.categoryId !== null && formData.categoryId !== undefined
              ? formData.categoryId
              : null,
          itemStoreId:
            formData.storeId !== null && formData.storeId !== undefined
              ? formData.storeId
              : null,

          owner: user.username,
        });

        await DataStore.save(newItem);
        console.log('Item created successfully!', formData);
      }

      setShowModal(false);
      await fetchItems();
    } catch (error) {
      console.log('Error saving/updating item', error);
    }
  }

  return (
    <div className='container'>
      <p className='text-center text-3xl mt-4'>Items</p>
      <div className='text-center mt-3'>
        <button
          className='bg-blue-500 text-white px-4 py-1 rounded'
          onClick={() => {
            setShowModal(true);
            setEditData(null); // Clear editData to create a new item
          }}
        >
          New Item
        </button>
      </div>
      {showModal && (
        <ItemModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateOrUpdateItem}
          onUpdate={handleCreateOrUpdateItem}
          onDelete={deleteItem}
          initialData={editData || {}}
          categories={categories}
          stores={stores}
        />
      )}
      <div className='grid md:grid-cols-4 gap-4 p-6'>
        {items
          .filter((item) => item.owner === currentUser) // Filter items for the current user
          .map((item) => (
            <div className='rounded border p-3 shadow-xl' key={item.id}>
              <div
                className='text-center w-100'
                onClick={() => {
                  setEditData(item); // Set the item data you want to edit
                  setShowModal(true); // Show the modal
                }}
              >
                <div className='py-2'>{item.name}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
