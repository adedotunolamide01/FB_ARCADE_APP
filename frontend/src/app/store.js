import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminauthReducer from '../features/auth/adminAuthSlice';
import salesReducer from '../features/sales/saleSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminauth: adminauthReducer,
    sale: salesReducer,
  },
});
