import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      console.log(product);
      const { cart } = state;
      const index = cart.findIndex((item) => item.id === product.id);
      if (index === -1) {
        console.log("add to cart");
        state.cart.push({
          ...product,
          quantity: 1,
          total: product.price,
        });
      } else {
        state.cart[index].quantity++;
        state.cart[index].total =
          state.cart[index].quantity * state.cart[index].price;
      }
      state.totalItems++;
      state.total += product.price;
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const { cart } = state;
      const index = cart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        state.cart[index].quantity--;
        if (state.cart[index].quantity === 0) {
          state.cart.splice(index, 1);
        }
        state.totalItems--;
        state.total -= product.price;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
