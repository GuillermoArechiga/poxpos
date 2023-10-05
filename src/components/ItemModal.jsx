import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function ItemModal({
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  initialData,
  categories,
  stores,
}) {
  const sanitizeInitialData = (data) => {
    const sanitizedData = { ...data };
    for (const key in sanitizedData) {
      if (sanitizedData[key] === null) {
        sanitizedData[key] = '';
      }
    }
    return sanitizedData;
  };

  const [formState, setFormState] = useState(
    sanitizeInitialData(initialData) || {
      name: '',
      cost_price: '',
      sale_price: '',
      start_stock: '',
      stock: '',
      bar_code: '',
      change_price: '',
      categoryId: '', // Initialize with an empty string
      storeId: '', // Initialize with an empty string
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'categoryId' || name === 'storeId') {
      // For categoryId and storeId, set the value directly in formState
      setFormState({ ...formState, [name]: value });
    } else {
      // For other fields, set the value in a nested object
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!formState.name) return;
    if (initialData) {
      // Handle update
      onUpdate(formState);
    } else {
      // Handle create
      onCreate(formState);
    }
  };

  const handleDelete = () => {
    onDelete(initialData.id);
    onClose(); // Close the modal
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 mx-4'>
      <div className='border p-12 shadow-xl rounded bg-white w-120 relative'>
        <h2 className='text-xl font-semibold mb-4'>
          {initialData ? 'Edit Item' : 'New Item'}
        </h2>
        <div className='flex flex-wrap mb-4'>
          <div className='w-1/2 pr-4'>
            <input
              type='text'
              name='name'
              placeholder='Item Name'
              value={formState.name}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            />
          </div>
          <div className='w-1/2 pl-4'>
            <input
              type='text'
              name='cost_price'
              placeholder='Cost Price'
              value={formState.cost_price}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            />
          </div>
        </div>
        {/* Repeat the pattern for other input fields */}
        <div className='flex flex-wrap mb-4'>
          <div className='w-1/2 pr-4'>
            <input
              type='text'
              name='sale_price'
              placeholder='Sale Price'
              value={formState.sale_price}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            />
          </div>
          <div className='w-1/2 pl-4'>
            <input
              type='text'
              name='start_stock'
              placeholder='Start Stock'
              value={formState.start_stock}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            />
          </div>
        </div>
        {/* Add the remaining input fields here */}
        <div className='flex flex-wrap mb-4'>
          <div className='w-1/2 pr-4'>
            <input
              type='text'
              name='bar_code'
              placeholder='Bar Code'
              value={formState.bar_code}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            />
          </div>
          <div className='w-1/2 pl-4'>
            <input
              type='text'
              name='change_price'
              placeholder='Change Price'
              value={formState.change_price}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            />
          </div>
        </div>
        <div className='flex flex-wrap mb-4'>
          <div className='w-1/2 pr-4'>
            <select
              name='categoryId'
              value={formState.categoryId || initialData.itemCategoryId || ''}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            >
              <option value=''>Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='w-1/2 pl-4'>
            <select
              name='storeId'
              value={formState.storeId || initialData.itemStoreId || ''}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            >
              <option value=''>Select Category</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='text-center'>
          {initialData ? (
            <>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded'
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded ml-4'
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              className='bg-green-500 text-white px-4 py-2 rounded'
              onClick={handleSubmit}
            >
              Create
            </button>
          )}
        </div>
        <div className='absolute top-0 right-0 m-4'>
          <FontAwesomeIcon icon={faCircleXmark} size='xl' onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
