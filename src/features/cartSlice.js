import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // List of products in the cart
  totalPrice: 0, // Total price of all products in the cart
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);

      if (existingProduct) {
        // If product already in the cart, increase the quantity
        existingProduct.quantity += 1;
      } else {
        // Otherwise, add new product with quantity 1
        state.items.push({ ...product, quantity: 1 });
      }

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.items.find((item) => item.id === productId);

      if (existingProduct) {
        // Update the quantity if the product exists in the cart
        existingProduct.quantity += quantity;

        // Ensure quantity doesn't go below 1
        if (existingProduct.quantity < 1) {
          existingProduct.quantity = 1;
        }
      }

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ).toFixed(2);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
