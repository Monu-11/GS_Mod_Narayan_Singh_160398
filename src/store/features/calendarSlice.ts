import { CalendarProps } from '@/core/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
  calendars: CalendarProps[];
}

const initialState: CalendarState = {
  calendars: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addCalendar: (state, action: PayloadAction<CalendarProps>) => {
      state.calendars.push(action.payload);
    },
  },
});

export const { addCalendar } = calendarSlice.actions;

export default calendarSlice.reducer;
