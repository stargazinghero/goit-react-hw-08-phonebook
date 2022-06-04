import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const getCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const isToken = state.auth.token;
    if (isToken === null) {
      toast('There is no token, return from fetchCurrentUser');
      return rejectWithValue();
    }
    token.set(isToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      toast(error.message);
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', userInfo);
      token.set(data.token);
      return data;
    } catch (error) {
      toast(error.message);
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', userInfo);
      token.set(data.token);
      return data;
    } catch (error) {
      toast(error.message);
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('users/logout');
      token.unset();
    } catch (error) {
      toast(error.message);
      return rejectWithValue(error);
    }
  }
);
