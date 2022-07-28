import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: null,
  },
  reducers: {
    toggleCart: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification: (state, action) => {
      state.notification = {
        message: action.payload.message,
        title: action.payload.title,
        status: action.payload.status,
      };
    },
  },
});

export const { toggleCart, showNotification } = uiSlice.actions;
export default uiSlice.reducer;
