import React, { useState } from 'react';

export default function ShiftModal({
  isOpen,
  onRequestClose,
  shift,
  onUpdateShift,
}) {
  const [updatedShift, setUpdatedShift] = useState({ ...shift });

  async function handleUpdateClick() {
    // Update the "is_open" property to false
    const updatedShiftWithIsOpenFalse = {
      ...updatedShift,
      is_open: false,
    };

    // Now, proceed with the update
    onUpdateShift(updatedShiftWithIsOpenFalse);
    onRequestClose();
  }

  return (
    isOpen && (
      <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={onRequestClose}>
            &times;
          </span>
          <h2>Close Shift</h2>
          <p>Are you sure you want to close this shift?</p>
          <button type='button' onClick={handleUpdateClick}>
            Close Shift
          </button>
        </div>
      </div>
    )
  );
}
