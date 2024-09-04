import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import {
    login as apiLogin,
  } from "../services/auth.services";
import { User, UserLoginParams } from "../types/user";
import { getToken, getUser, removeUserSession, setUserSession } from "../services/token.services";
  
  // Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (user: UserLoginParams, { rejectWithValue }) => {
    try {
      const response = (await apiLogin(user)) as User;

      // Save the token on the session
      if(!!response) {
        setUserSession(response)
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
    removeUserSession()
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUser(),
    token: getToken(),
    isLoading: false,
    error: null,
  },
  reducers: {
    // You can add more reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = localStorage.getItem('token');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});
  