// carSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CarState {
  car: any; // Define the structure of your car object here
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  car: null,
  loading: false,
  error: null,
};

export const fetchCar = createAsyncThunk('car/fetchCar', async (carType: string) => {
  const response = await axios.get(`/api/cars?carType=${carType}`);
  return response.data;
});

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.car = action.payload;
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.car = null;
      });
  },
});

export default carSlice.reducer;
