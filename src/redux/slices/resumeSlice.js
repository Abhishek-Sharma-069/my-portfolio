import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios';

// Async thunk for fetching resume data
export const fetchResumeData = createAsyncThunk(
    'resume/fetchResumeData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/resume-data');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching resume data');
        }
    }
);

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumeUrl: null,
        loading: false,
        error: null,
    },
    reducers: {
        setResumeUrl: (state, action) => {
            state.resumeUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResumeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResumeData.fulfilled, (state, action) => {
                state.loading = false;
                state.resumeUrl = action.payload;
            })
            .addCase(fetchResumeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setResumeUrl } = resumeSlice.actions;
export default resumeSlice.reducer;