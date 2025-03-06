import { StoreProps } from '@/core/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
  stores: StoreProps[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<StoreProps>) => {
      state.stores.push(action.payload);
    },
    updateStore: (state, action: PayloadAction<StoreProps>) => {
      const index = state.stores.findIndex(
        (store) => store.ID === action.payload.ID
      );
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    removeStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter(
        (store) => store.ID !== action.payload
      );
    },
    reorderStores: (state, action: PayloadAction<StoreProps[]>) => {
      state.stores = action.payload;
    },
  },
});

export const { addStore, updateStore, removeStore, reorderStores } =
  storeSlice.actions;
export default storeSlice.reducer;
