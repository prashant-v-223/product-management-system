import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: !!localStorage.getItem('user'),
    users: JSON.parse(localStorage.getItem('users')) || [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            const { username, email, password } = action.payload;
            const existingUser = state.users.find((user) => user.email === email);

            if (existingUser) {
                throw new Error('Email already exists.');
            }

            const newUser = { username, email, password };
            state.users.push(newUser);
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(
                (user) => user.email === email && user.password === password
            );

            if (!user) {
                throw new Error('Invalid email or password.');
            }

            state.isAuthenticated = true;
            state.user = user;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
