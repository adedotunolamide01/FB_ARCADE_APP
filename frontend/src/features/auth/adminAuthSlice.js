import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminAuthService from './adminAuthService';

// Get user from localStorage
const adminuser = JSON.parse(localStorage.getItem('adminuser'));

const initialState = {
  adminuser: adminuser ? adminuser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const adminregister = createAsyncThunk(
  'adminauth/register',
  async (adminuser, thunkAPI) => {
    try {
      return await adminAuthService.adminregister(adminuser);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const adminlogin = createAsyncThunk(
  'adminauth/login',
  async (adminuser, thunkAPI) => {
    try {
      // return await adminAuthService.adminlogin(adminuser);
      const response = await adminAuthService.adminlogin(adminuser);
      console.log(response.token);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminlogout = createAsyncThunk('adminauth/logout', async () => {
  await adminAuthService.adminlogout();
});

export const adminAuthSlice = createSlice({
  name: 'adminauth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminregister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminregister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminuser = action.payload;
      })
      .addCase(adminregister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.adminuser = null;
      })
      .addCase(adminlogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminlogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminuser = action.payload;
      })
      .addCase(adminlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.adminuser = null;
      })
      .addCase(adminlogout.fulfilled, (state) => {
        state.adminuser = null;
      });
  },
});

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
