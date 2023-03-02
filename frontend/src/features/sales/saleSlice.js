// (ticket) => ticket._id.toString() === req.body.sales[i].ticketId
// );```
// - This line retrieves the ticketName, ticketAmount, and _id properties from the ticket object in the tickets array that matches the ticketId for the current sale in the req.body.sales array.

// ```      const ticketCount = req.body.sales[i].ticketCount || 0;```
// - This line sets the ticketCount variable to the ticketCount value in the current sale in the req.body.sales array or 0 if it doesn't exist.

// ```      const totalCost = parseInt(ticketAmount) * ticketCount;```
// - This line calculates the totalCost by multiplying the ticketAmount by the ticketCount.

// ```      const outletId = adminUser.outlet._id;```
// - This line retrieves the outletId from the adminUser object.

// ```      const sale = new Sale({
//   ticketName,
//   ticketAmount,
//   ticketCount,
//   ticketId: _id,
//   totalCost,
//   adminUser: adminUser._id,
//   outletId,
// });```
// - This line creates a new Sale object with the ticketName, ticketAmount, ticketCount, _id, totalCost, adminUser._id, and outletId properties.

// ```      await sale.save();```
// - This line saves the new Sale object to the database.

// ```      sales.push(sale);```
// - This line adds the new Sale object to the sales array.

// ```    }```
// - This line ends the for loop.

// ```    res.json(sales);```
// - This line sends the sales array as a JSON response.

// ```  } catch (err) {```
// - This line begins the catch block for

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { adminlogin } from '../auth/adminAuthService';
import saleService from '../../features/sales/saleService';

const initialState = {
  sales: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Create new sale
export const createSale = createAsyncThunk(
  'sales/create',
  async (saleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminauth.adminuser.token;
      console.log(token);
      return await saleService.createSale(saleData, token);
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

// Get user sales
export const getSales = createAsyncThunk(
  'sales/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminauth.adminuser.token;
      return await saleService.getSales(token);
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

// Delete user sales
export const deleteSale = createAsyncThunk(
  'sales/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminauth.adminuser.token;
      return await saleService.deleteSale(id, token);
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

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sales.push(action.payload);
      })
      .addCase(createSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sales = action.payload;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sales = state.sales.filter(
          (sale) => sale._id !== action.payload.id
        );
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = saleSlice.actions;
export default saleSlice.reducer;
