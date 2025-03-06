import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { registerApi } from '@/services/register';
import storeReducer from './features/storeSlice';
import skuReducer from './features/skuSlice';
import planningReducer from './features/planningSlice';
import calendarReducer from './features/calendarSlice';

const rootReducer = combineReducers({
  [registerApi.reducerPath]: registerApi.reducer,
  stores: storeReducer,
  sku: skuReducer,
  planning: planningReducer,
  calendar: calendarReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        registerApi.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
