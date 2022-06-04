import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from './authOperations';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isGetCurrentUser: false,
  },
  extraReducers: {
    [getCurrentUser.pending](state) {
      state.isGetCurrentUser = true;
    },
    [getCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isGetCurrentUser = false;
    },
    [getCurrentUser.rejected](state) {
      state.isGetCurrentUser = false;
    },
    [registerUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [loginUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logoutUser.fulfilled](state) {
      state.user = { name: null, email: null };
      state.isLoggedIn = false;
    },
  },
});

export const authReducer = authSlice.reducer;

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;
export const getUserEmail = state => state.auth.user.email;
export const getIsGetCurrentUser = state => state.auth.isGetCurrentUser;

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

export const persistedReducer = persistReducer(persistConfig, authReducer);
