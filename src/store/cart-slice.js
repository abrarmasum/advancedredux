import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    totalItems: 0,
  },
  reducers: {
    replaceCart: (state, action) => {
      console.log("replaceCart", action.payload);
      const cartdata = action.payload;
      state.cart = cartdata.cart;
      state.total = cartdata.total;
      state.totalItems = cartdata.totalItems;
    },

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

export const { addToCart, removeFromCart, replaceCart } = cartSlice.actions;
export default cartSlice.reducer;

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchCart = async () => {
      const response = await fetch(
        "https://movieproject-c30a4-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log(data);

      return data;
    };

    try {
      const cartData = await fetchCart();
      dispatch(replaceCart(cartData));
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        message: "Sending cart data to server",
        title: "Sending...",
        status: "panding",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://movieproject-c30a4-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      const cartData = await response.json();
      console.log("look here " + cartData);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          message: "Cart data sent to server",
          title: "Success",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "Something went wrong",
          title: "Error",
          status: "error",
        })
      );
    }
  };
};
