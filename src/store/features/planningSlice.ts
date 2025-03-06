import { PlanningProps } from '@/core/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanningState {
  plannings: PlanningProps[];
}

const initialState: PlanningState = {
  plannings: [],
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    addPlanning: (state, action: PayloadAction<PlanningProps>) => {
      state.plannings.push(action.payload);
    },
  },
});

export const { addPlanning } = planningSlice.actions;

export default planningSlice.reducer;
