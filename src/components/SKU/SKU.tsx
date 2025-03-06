'use client';

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { RootState } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { SKUProps } from '@/core/types';
import { Delete, Pencil } from 'lucide-react';
import { getSkuData } from '@/services/skuData';
import { addSKU, removeSKU, updateSKU } from '@/store/features/skuSlice';
import SKUFormModal from './SKUFormModal';

ModuleRegistry.registerModules([AllCommunityModule]);

const SKU = () => {
  const dispatch = useAppDispatch();
  const skus = useAppSelector((state: RootState) => state.sku.skus);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [newSKU, setNewSKU] = useState({
    ID: '',
    Label: '',
    Class: '',
    Department: '',
    Price: 0,
    Cost: 0,
  });

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    if (skus.length === 0) {
      const fetchData = async () => {
        try {
          const data = await getSkuData();
          data.forEach((sku: SKUProps) => {
            dispatch(addSKU(sku));
          });
        } catch (error) {
          console.error('Error fetching stores data:', error);
        }
      };

      fetchData();
    }
  }, [dispatch, skus.length]);

  useEffect(() => {
    const columns: ColDef[] = [
      {
        headerName: '',
        field: 'delete',
        width: 70,
        cellRenderer: (params: any) => (
          <button onClick={() => handleRemoveSKU(params.node.data.ID)}>
            <Delete />
          </button>
        ),
      },
      {
        headerName: '',
        field: 'edit',
        width: 70,
        cellRenderer: (params: any) => (
          <button onClick={() => handleUpdateSKU(params.node.data.ID)}>
            <Pencil />
          </button>
        ),
      },
      { headerName: 'SKU', field: 'Label' },
      { headerName: 'Price', field: 'Price' },
      { headerName: 'Cost', field: 'Cost' },
    ];

    setColumnDefs(columns);
  }, []);

  const handleAddSKU = () => {
    if (newSKU.ID && newSKU.Label) {
      dispatch(addSKU(newSKU));
      setNewSKU({
        ID: '',
        Label: '',
        Class: '',
        Department: '',
        Price: 0,
        Cost: 0,
      });
    }
  };

  const handleRemoveSKU = (id: string) => {
    dispatch(removeSKU(id));
  };

  const handleUpdateSKU = (id: string) => {
    const updatedSKU = { ...newSKU, ID: id };
    dispatch(updateSKU(updatedSKU));
  };

  return (
    <>
      <div className='h-[500px] w-full'>
        <AgGridReact rowData={skus} columnDefs={columnDefs} />
      </div>
      <div className='mt-5'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='mt-5 rounded-md bg-orange-400 p-3'
        >
          New SKU
        </button>
      </div>
      <SKUFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SKU;
