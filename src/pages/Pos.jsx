import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sale, Category, Item, Order, Shift } from '../models';
import PosModal from '../components/PosModal';
import { Auth } from '@aws-amplify/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Pos() {
  const [sales, updateSales] = useState([]);
  const [items, updateItems] = useState([]);
  const [categories, updateCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default selected category to 'all'
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    fetchCurrentUser();
    fetchSales();
    fetchItems();
    fetchCategory();
    const subscription = DataStore.observe(Sale).subscribe(() => fetchSales());
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

  async function fetchSales() {
    const sales = await DataStore.query(Sale);
    updateSales(sales);
  }

  async function fetchItems() {
    try {
      const items = await DataStore.query(Item);
      updateItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  async function fetchCategory() {
    try {
      const categories = await DataStore.query(Category);
      updateCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          // If the item is in the list, increment its quantity by 1
          return {
            ...selectedItem,
            quantity: (selectedItem.quantity || 0) + 1,
          };
        }
        return selectedItem;
      });

      if (!updatedItems.some((selectedItem) => selectedItem.id === item.id)) {
        // If the item is not in the list, add it with quantity 1
        updatedItems.push({ ...item, quantity: 1 });
      }

      return updatedItems;
    });

    incrementQuantity(item.id); // Increment the quantity by 1
  };

  const handleItemRemove = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item.id !== itemId)
    );
    setItemQuantities({}); // Decrement the quantity when removing the item
  };

  // Function to increment the quantity for a specific item
  const incrementQuantity = (itemId) => {
    setItemQuantities((prevState) => ({
      ...prevState,
      [itemId]: (prevState[itemId] || 0) + 1,
    }));
  };

  // Function to decrement the quantity for a specific item
  const decrementQuantity = (itemId) => {
    setItemQuantities((prevState) => {
      const updatedQuantities = { ...prevState };
      updatedQuantities[itemId] = Math.max(
        (updatedQuantities[itemId] || 0) - 1,
        0
      );

      // Remove the item from itemQuantities if the quantity reaches 0
      if (updatedQuantities[itemId] === 0) {
        delete updatedQuantities[itemId];
      }

      return updatedQuantities;
    });
  };

  const saveSelectedItemsAsSales = async (selectedPaymentOption) => {
    if (selectedItems.length === 0) return;

    try {
      // Create a new order
      const totalOrder = selectedItems.reduce(
        (total, item) =>
          total + item.sale_price * (itemQuantities[item.id] || 1),
        0
      );
      const totalRevenue = selectedItems.reduce(
        (total, item) =>
          total + item.cost_price * (itemQuantities[item.id] || 1),
        0
      );

      const newOrder = new Order({
        owner: currentUser,
        payment: selectedPaymentOption, // You can customize the payment method
        total_order: totalOrder,
        revenue: totalOrder - totalRevenue,
      });

      // Save the order first
      const savedOrder = await DataStore.save(newOrder);

      // Create and save sales for each selected item
      for (const selectedItem of selectedItems) {
        const sale = new Sale({
          item: selectedItem.name,
          quantity: selectedItem.quantity,
          sale_price: selectedItem.sale_price,
          cost_price: selectedItem.cost_price,
          saleOrderId: savedOrder.id, // Associate the sale with the order
          // Add any other necessary fields here
        });

        await DataStore.save(sale);
      }

      // Clear the selected items
      setSelectedItems([]);
      setItemQuantities({});

      // Fetch sales again
      await fetchSales();
    } catch (error) {
      console.error('Error saving selected items as sales:', error);
    }
  };

  // Function to calculate the total sum of selected items multiplied by quantities
  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.sale_price * (itemQuantities[item.id] || 1),
      0
    );
  };

  return (
    <div className='mx-auto p-2 mt-3'>
      <div className='flex'>
        {/* Left Side: Categories and Items */}
        <div className='w-2/3 p-2' style={{ overflowX: 'auto' }}>
          {/* Categories and Items */}
          <div className='flex overflow-x-auto px-4'>
            <div key='all' className='related'>
              <div
                className={`rounded-full p-3 shadow-xl mx-6 ${
                  selectedCategory === 'all'
                    ? 'border-blue-200 border-4 text-blue-200'
                    : ''
                }`}
                style={{ width: '50px', height: '50px' }}
                onClick={() => handleCategoryClick('all')}
              >
                <div className='text-center w-100'></div>
              </div>
              <div
                className={`text-center mt-2 ${
                  selectedCategory === 'all' ? 'text-blue-200' : ''
                }`}
              >
                All
              </div>
            </div>
            {categories.map((category) => (
              <div key={category.id} className='relative'>
                <div
                  onClick={() => handleCategoryClick(category.id)}
                  className={`rounded-full p-3 shadow-xl mx-6 ${
                    selectedCategory === category.id
                      ? 'border-blue-200 border-4 text-blue-200'
                      : ''
                  }`}
                  style={{ width: '50px', height: '50px' }}
                >
                  <div className='text-center w-100'></div>
                </div>
                <div
                  className={`text-center mt-2 ${
                    selectedCategory === category.id ? 'text-blue-200' : ''
                  }`}
                >
                  {category.name}
                </div>
              </div>
            ))}
          </div>

          {/* Items */}
          <div className='container'>
            <div className='' style={{ height: '65vh' }}>
              <div
                className='w-full p-2'
                style={{ overflowY: 'auto', height: '100%' }}
              >
                <div className='grid md:grid-cols-4 gap-4 p-4'>
                  {items
                    .filter((item) => item.owner === currentUser)
                    .filter(
                      (item) =>
                        selectedCategory === 'all' ||
                        item.itemCategoryId === selectedCategory
                    )
                    .map((item) => (
                      <div
                        className='rounded border p-3 shadow-xl cursor-pointer'
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className='text-center w-100'>
                          <div className='py-2'>{item.name}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Selected Items */}
        <div className='w-1/3 p-2 rounded shadow-xl'>
          <div
            className='mx-auto'
            style={{ height: '65vh', flexShrink: 0 }}
          >
            <div className='mt-1 ms-4'>
              <div className='flex items-center text-center'>
                <div className='text-xl font-bold '>Order:</div>
              </div>
            </div>
            <div
              className='selected-items-container'
              style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}
            >
              <ul>
                {selectedItems.map((item) => (
                  <div
                    className='bg-white p-4 rounded shadow-lg my-2'
                    key={item.id}
                  >
                    <div className='flex items-center justify-between'>
                      <li className=''>{item.name}</li>
                      <div className='justify-end px-4'>
                        <FontAwesomeIcon
                          icon={faTrash}
                          size='xs'
                          onClick={() => handleItemRemove(item.id)} // Handle item removal here
                          style={{ cursor: 'pointer', color: 'red' }}
                        />
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <li className='mt-3 text-lg'>
                        ${' '}
                        {(
                          item.sale_price * (itemQuantities[item.id] || 1)
                        ).toFixed(2)}
                      </li>
                      {/* Quantity buttons */}
                      <div className='flex mt-2 items-center justify-end'>
                        <button
                          className='border bg-slate-300 hover:bg-slate-500 rounded px-2'
                          onClick={() => decrementQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className='mx-2'>
                          {itemQuantities[item.id] || 1}
                        </span>
                        <button
                          className='border bg-slate-300 hover:bg-slate-500 rounded px-2'
                          onClick={() => incrementQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className='bg-white rounded'>
            <div className='flex items-center place-content-center'>
              <div className='text-xl font-semibold'>Total:</div>
              {/* Display the total sum */}
              <div className='ms-4 font-bold text-xl'>
                ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
          {/* Add a button here */}
          <div className='mt-2 mx-auto w-full px-2'>
            <button
              className='bg-blue-500 text-white w-full px-4 py-2 rounded shadow-lg'
              onClick={() => setShowModal(true)}
              disabled={selectedItems.length === 0}
            >
              Proceed Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Render the modal */}
      {showModal && (
        <PosModal
          onClose={() => setShowModal(false)}
          totalOrder={selectedItems.reduce(
            (total, item) =>
              total + item.sale_price * (itemQuantities[item.id] || 1),
            0
          )}
          onSaveSelectedItems={saveSelectedItemsAsSales}
        />
      )}
    </div>
  );
}
