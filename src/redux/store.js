import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import portfolioReducer from './slices/portfolioSlice';

const store = configureStore({
  reducer: {
    resume: resumeReducer,
    portfolio: portfolioReducer,
  },
});

export default store;