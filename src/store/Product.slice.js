/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { getProductThunk } from "./Product.thunk"


const initialState = {
  product: [],
  isLoading: false,
  error: '',
  total: 0,
  discount: 0,
}
const productSlice = createSlice({
        name: 'product',
        initialState,
        reducers:{
            increment:(state, action)=>{
                state.product.map((item)=>{
                 if (action.payload === item.id) {
                    item.orderedQuantity++
                    item.total = +(item.orderedQuantity * item.price).toFixed(2)
                    const sum = state.product.reduce(
                        (sum, product) => sum + product.total,
                        0
                    )
                    state.total = sum
                    if (sum > 1000) {
                        state.discount = sum * 0.1
                        state.total = sum - state.discount
                    }
                 }

                })
            },
            decrement:(state, action)=>{
                state.product.map((item)=>{
                    if (action.payload === item.id) {
                       item.orderedQuantity--
                       item.total = (item.total - item.price).toFixed(2)
                       state.total = state.total - item.price 
                    
                    }}
                )
            }
        },
        extraReducers:{
            [getProductThunk.fulfilled]: (state, action) =>{
                state.product = action.payload
                state.isLoading= false
                state.error = ""
            },
            [getProductThunk.pending]:(state)=>{
                state.isLoading = true
            },
            [getProductThunk.rejected]:(state, action)=>{
                state.isLoading = false
                state.error = action.payload
            }
        }   
})

export const productAction = productSlice.actions
export default productSlice