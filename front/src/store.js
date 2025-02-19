import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice"; 

export const store = configureStore({
  reducer: {
    products: productReducer, 
  },
});
