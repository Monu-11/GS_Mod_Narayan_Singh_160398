import { SKUProps } from '@/core/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SKUState {
  skus: SKUProps[];
}

const initialState: SKUState = {
  skus: [],
};

const skuSlice = createSlice({
  name: 'sku',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKUProps>) => {
      state.skus.push(action.payload);
    },

    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.ID !== action.payload);
    },

    updateSKU: (state, action: PayloadAction<SKUProps>) => {
      const index = state.skus.findIndex((sku) => sku.ID === action.payload.ID);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
  },
});

export const { addSKU, removeSKU, updateSKU } = skuSlice.actions;

export default skuSlice.reducer;
