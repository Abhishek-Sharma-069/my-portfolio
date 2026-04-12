import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios'

// Async thunk for fetching portfolio data (skipped if data exists unless arg.force is true)
export const fetchPortfolioData = createAsyncThunk(
    'portfolio/fetchPortfolioData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/portfolio-data');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching portfolio data');
        }
    },
    {
        condition: (arg, { getState }) => {
            const force = arg?.force === true;
            const { portfolio } = getState();
            if (portfolio.data && !force) {
                return false;
            }
            return true;
        },
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