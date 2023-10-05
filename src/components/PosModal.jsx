import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function PosModal({ onClose, onSaveSelectedItems, totalOrder }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [customValue, setCustomValue] = useState('');
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('Card'); // Default payment option

  const handleOptionChange = (index) => {
    setSelectedOption(optionValues[index]);
    setCustomValue(''); // Clear the custom input when an option button is clicked
  };

  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
    const customAmount = parseFloat(event.target.value);
    if (!isNaN(customAmount) && customAmount >= 0) {
      setSelectedOption(customAmount);
    } else {
      setSelectedOption(0);
    }
  };

  const optionValues = [20, 50, 100, 200, 500];

  const paymentOptions = ['Cash', 'Card', 'Other'];

  useEffect(() => {
    setSelectedOption(0);
  }, []);

  const handleSaveItemsClick = () => {
    onSaveSelectedItems(selectedPaymentOption);
    onClose(); // Call the onSaveSelectedItems function
  };

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center z-50'>
      <div className='border p-12 shadow-xl rounded bg-white relative'>
        {totalOrder > 0 && (
          <div className='mt-4'>
            <p className='text-xl'>
              Total Order Amount: ${totalOrder.toFixed(2)}
            </p>
            <div className='flex justify-center mt-4'>
              {optionValues.map((optionValue, index) => (
                <button
                  key={index}
                  className={`bg-blue-500 text-white px-4 py-2 mx-2 rounded ${
                    selectedOption === optionValue ? 'bg-blue-600' : ''
                  }`}
                  onClick={() => handleOptionChange(index)}
                  disabled={totalOrder >= optionValue}
                >
                  {optionValue}
                </button>
              ))}
              <input
                type='number'
                placeholder='Custom'
                className='border px-2 py-1 rounded text-center'
                value={customValue}
                onChange={handleCustomInputChange}
              />
            </div>
            <div className='flex my-6 items-center text-xl'>
              <div>Difference: </div>
              {selectedOption > 0 && (
                <div className='ms-3'>
                  ${(selectedOption - totalOrder).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Options */}
        <div className='mt-4'>
          <p className='text-xl'>Payment Options:</p>
          <div className='flex justify-center mt-2'>
            {paymentOptions.map((option, index) => (
              <label key={index} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value={option}
                  checked={selectedPaymentOption === option}
                  onChange={() => handlePaymentOptionChange(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className='mt-4 text-center'>
          <button
            className='bg-green-500 text-white px-4 py-2 rounded'
            onClick={handleSaveItemsClick}
          >
            Save Selected Items
          </button>
        </div>
        <div className='absolute top-0 right-0 m-4'>
          <FontAwesomeIcon icon={faCircleXmark} size='xl' onClick={onClose} />
        </div>
      </div>
    </div>
  );
}