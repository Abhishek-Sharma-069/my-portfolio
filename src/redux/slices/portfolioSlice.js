import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Async thunk for fetching portfolio data
export const fetchPortfolioData = createAsyncThunk(
    'portfolio/fetchPortfolioData',
    async (_, { getState, rejectWithValue }) => {
        const { portfolio } = getState();
        if (portfolio.data) {
            // Prevent duplicate API calls
            return portfolio.data;
        }
        try {
            const response = await axiosInstance.get('/portfolio-data');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching portfolio data');
        }
    }
);

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortfolioData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPortfolioData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPortfolioData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default portfolioSlice.reducer;