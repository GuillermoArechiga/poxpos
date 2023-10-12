import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function ShiftModalC({ onClose, onCreate, onUpdate, onDelete, initialData }) {
  const [formState, setFormState] = useState(initialData || {});


  const handleSubmit = () => {
    if (initialData) {
      // Handle update and update the end_time
      const updatedFormState = {
        ...formState,
      };
      console.log("Updated FormState:", updatedFormState)
      onUpdate(updatedFormState);
    } else {
      // Handle create
      onCreate(formState);
    }
  };

  const handleDelete = () => {
    if (initialData) {
      // If there's initial data (editing mode), call onDelete with the store's ID
      onDelete(initialData.id);
    }
    onClose(); // Close the modal
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center z-50'>
      <div className='border p-12 shadow-xl rounded bg-white relative'>
        <h2 className='text-xl font-semibold mb-4 text-center'>
          {initialData ? 'Edit Shift' : 'New Shift'}
        </h2>
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

export default ShiftModalC;