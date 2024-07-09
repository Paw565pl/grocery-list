import Product from "@/entities/product";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface productsListState {
  products: Product[];
}

const initialState = {
  products: [],
} satisfies productsListState as productsListState;

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    clear: (state) => {
      state.products = [];
    },
  },
});

export const actions = productsListSlice.actions;
export default productsListSlice.reducer;
