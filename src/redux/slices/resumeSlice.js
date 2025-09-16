import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumeUrl: null,
    },
    reducers: {
        setResumeUrl: (state, action) => {
            state.resumeUrl = action.payload;
        },
    },
});

export const { setResumeUrl } = resumeSlice.actions;
export default resumeSlice.reducer;