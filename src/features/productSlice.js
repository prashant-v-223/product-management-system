import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ productsPerPage, currentPage }) => {
  console.log("limit", currentPage);
  const skip = (currentPage - 1) * productsPerPage; // Calculate skip based on current page and limit

  const response = await axios.get(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
  return response.data; // Return the products array
});
// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
