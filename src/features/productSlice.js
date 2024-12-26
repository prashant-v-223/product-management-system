import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductscategories = createAsyncThunk('products/fetchProductscategories', async ({ }) => {
  const response = await axios.get(`https://dummyjson.com/products/categories`);
  return response.data; // Return the products array
});
// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ productsPerPage, currentPage, filterName, selectedCategory }) => {
  console.log("selectedCategory", selectedCategory);
  const skip = (currentPage - 1) * productsPerPage; // Calculate skip based on current page and limit
  const response = await axios.get(selectedCategory == "all" || selectedCategory == undefined ? `https://dummyjson.com/products/search?limit=${productsPerPage}&q=${filterName}&skip=${skip}` : `https://dummyjson.com/products/category/${selectedCategory}/?limit=50&skip=${skip}`);
  return response.data; // Return the products array
});
// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductscategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductscategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchProductscategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
