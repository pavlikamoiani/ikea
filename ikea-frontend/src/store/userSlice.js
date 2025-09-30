import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage if present
const savedUser = localStorage.getItem('user');
const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('user');
            }
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;