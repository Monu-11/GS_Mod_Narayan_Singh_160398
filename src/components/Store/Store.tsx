'use client';

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { RootState } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  addStore,
  removeStore,
  reorderStores,
  updateStore,
} from '@/store/features/storeSlice';
import { StoreProps } from '@/core/types';
import { getStoresData } from '@/services/storesData';
import { Delete, Pencil } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);

const Store = () => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state: RootState) => state.stores.stores);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    if (stores.length === 0) {
      const fetchData = async () => {
        try {
          const data = await getStoresData();
          data.forEach((store: StoreProps) => {
            dispatch(addStore(store));
          });
        } catch (error) {
          console.error('Error fetching stores data:', error);
        }
      };

      fetchData();
    }
  }, [dispatch, stores.length]);

  useEffect(() => {
    const columns: ColDef[] = [
      {
        headerName: '',
        field: 'delete',
        width: 70,
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleDelete(params.node.data.ID)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Delete />
          </button>
        ),
      },
      {
        headerName: '',
        field: 'edit',
        width: 70,
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleEdit(params.node.data.ID)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Pencil />
          </button>
        ),
      },
      { headerName: 'SeqNo', field: 'SeqNo', rowDrag: true },
      { headerName: 'ID', field: 'ID' },
      { headerName: 'Label', field: 'Label' },
      { headerName: 'City', field: 'City' },
      { headerName: 'State', field: 'State' },
    ];

    setColumnDefs(columns);
  }, []);

  const handleEdit = (id: string) => {
    dispatch(
      updateStore({
        ID: id,
        Label: 'Updated Store',
        City: 'Updated City',
        State: 'UC',
        SeqNo: 1,
      })
    );
  };

  const handleDelete = (storeId: string) => {
    dispatch(removeStore(storeId));
  };

  const handleAddStore = () => {
    const newStore = {
      SeqNo: stores.length + 1,
      ID: `ST${Math.floor(Math.random() * 1000)}`,
      Label: 'New Store',
      City: 'New City',
      State: 'NC',
    };
    dispatch(addStore(newStore));
  };

  const handleRowDragEnd = (event: any) => {
    const { node } = event;
    const newRowOrder = [...stores];
    const fromIndex = node.rowIndex;
    const toIndex = event.overIndex;

    if (fromIndex !== toIndex) {
      // Move the store in the array
      const movedStore = newRowOrder.splice(fromIndex, 1)[0];
      newRowOrder.splice(toIndex, 0, movedStore);

      // Update Redux store with new order
      dispatch(reorderStores(newRowOrder));
    }
  };

  return (
    <>
      <div className='h-[500px] w-full'>
        <AgGridReact
          rowData={stores}
          columnDefs={columnDefs}
          onRowDragEnd={handleRowDragEnd}
        />
      </div>
      <div>
        <button
          onClick={handleAddStore}
          className='mt-5 rounded-md bg-orange-400 p-3'
        >
          New Store
        </button>
      </div>
    </>
  );
};

export default Store;
