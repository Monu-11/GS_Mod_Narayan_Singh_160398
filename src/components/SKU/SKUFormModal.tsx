import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addSKU } from '@/store/features/skuSlice';
import { SKUProps } from '@/core/types';

const SKUFormModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [newSKU, setNewSKU] = useState<SKUProps>({
    ID: '',
    Label: '',
    Class: '',
    Department: '',
    Price: 0,
    Cost: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'Price' || name === 'Cost') {
      setNewSKU({
        ...newSKU,
        [name]: value ? parseFloat(value) : 0,
      });
    } else {
      setNewSKU({
        ...newSKU,
        [name]: value,
      });
    }
  };

  const handleAddSKU = () => {
    if (
      newSKU.ID &&
      newSKU.Label &&
      !isNaN(newSKU.Price) &&
      !isNaN(newSKU.Cost)
    ) {
      dispatch(addSKU(newSKU));
      setNewSKU({
        ID: '',
        Label: '',
        Class: '',
        Department: '',
        Price: 0,
        Cost: 0,
      });
      onClose(); // Close the modal after adding
    }
  };

  return (
    <>
      {isOpen && (
        <div className='bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-gray-500'>
          <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-xl font-semibold'>Add New SKU</h2>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  SKU ID
                </label>
                <input
                  type='text'
                  name='ID'
                  value={newSKU.ID}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Label
                </label>
                <input
                  type='text'
                  name='Label'
                  value={newSKU.Label}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Class
                </label>
                <input
                  type='text'
                  name='Class'
                  value={newSKU.Class}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Department
                </label>
                <input
                  type='text'
                  name='Department'
                  value={newSKU.Department}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Price
                </label>
                <input
                  type='number'
                  name='Price'
                  value={newSKU.Price}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Cost
                </label>
                <input
                  type='number'
                  name='Cost'
                  value={newSKU.Cost}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm'
                />
              </div>
            </div>

            <div className='mt-6 flex justify-end space-x-4'>
              <button
                onClick={onClose}
                className='rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300'
              >
                Cancel
              </button>
              <button
                onClick={handleAddSKU}
                className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
              >
                Add SKU
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SKUFormModal;
