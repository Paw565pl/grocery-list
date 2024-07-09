import Product from "@/entities/product";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface productsListItem {
  product: Product;
  quantity: number;
}

const initialState = [] satisfies productsListItem[] as productsListItem[];

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const item = state.find((item) => item.product.id === action.payload.id);

      if (item) {
        item.quantity++;
      } else {
        state.push({ product: action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.product.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        return state.filter((item) => item.product.id !== action.payload);
      }
    },
  },
});

export const actions = productsListSlice.actions;
export default productsListSlice.reducer;
