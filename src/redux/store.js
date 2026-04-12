import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './slices/portfolioSlice';

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});

export default store;