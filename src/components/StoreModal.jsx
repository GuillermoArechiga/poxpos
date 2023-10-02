import React, { useState } from 'react';

function NewStoreModal({ onClose, onCreate, onUpdate, initialData }) {
  const [formState, setFormState] = useState(initialData || { name: '', owner: '' });

  const handleNameChange = (event) => {
    setFormState({ ...formState, name: event.target.value });
  };

  const handleOwnerChange = (event) => {
    setFormState({ ...formState, owner: event.target.value });
  };

  const handleSubmit = () => {
    if (initialData) {
      // Handle update
      onUpdate(formState);
    } else {
      // Handle create
      onCreate(formState);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Store' : 'New Store'}
        </h2>
        <input
          type="text"
          placeholder="Store Name"
          value={formState.name}
          onChange={handleNameChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Store Owner"
          value={formState.owner}
          onChange={handleOwnerChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <div className="text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {initialData ? 'Save' : 'Create'}
          </button>
          <button className="text-gray-500 ml-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewStoreModal;
