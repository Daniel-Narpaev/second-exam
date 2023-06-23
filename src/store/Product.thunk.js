/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../JS/dataService";

export const getProductThunk = createAsyncThunk(
    "product/getProduct", 
    async (payload, {rejectWithValue})=> {
       try {
        const { products } = await getProducts()
            const data = products.map((product) => ({
                ...product,
                orderedQuantity: 0,
                total: 0,
            }))
            return data
       } catch (error) {
        return rejectWithValue("Some thing went wrong")
       }
    }
)