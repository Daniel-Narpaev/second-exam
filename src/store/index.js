/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Product.slice";


export const store = configureStore({
    reducer:{
        [productSlice.name]: productSlice.reducer
    }
})