import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   addCartItem: (state, action) => {
      action.payload.forEach((item) => {
        const existingItem = state.cartItems.find((cartItem) => cartItem._id === item._id);
        if (!existingItem) {
          const total = item.price * item.qty;
          state.cartItems.push({ ...item, qty: 1, total });
        }
      });
    },
    deleteCartItem: (state, action) => {
      const index = state.cartItems.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },
    increaseQty: (state, action) => {
      const index = state.cartItems.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.cartItems[index].qty += 1;
        state.cartItems[index].total = state.cartItems[index].price * state.cartItems[index].qty;
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItems.findIndex((el) => el._id === action.payload);
      if (index !== -1 && state.cartItems[index].qty > 1) {
        state.cartItems[index].qty -= 1;
        state.cartItems[index].total = state.cartItems[index].price * state.cartItems[index].qty;
      }
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const {
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
