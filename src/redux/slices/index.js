import { combineReducers } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';

const rootReducer = combineReducers({
    portfolio: portfolioReducer,
    // Add other reducers here for scalability
});

export default rootReducer;