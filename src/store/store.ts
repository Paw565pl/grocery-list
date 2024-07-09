import { configureStore } from "@reduxjs/toolkit";
import productsListReducer from "./productsListSlice";

const store = configureStore({
  reducer: { productsList: productsListReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
