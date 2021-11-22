import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './slices/balanceSlice';

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
