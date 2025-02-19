import { createSlice } from "@reduxjs/toolkit";


 const productSlice=createSlice({
name:"products",
initialState:{
    items: []
},
reducers:{
    setProducts:(state,action)=>{
        state.items=action.payload
    },
    addProduct: (state, action) => {
        state.items.push(action.payload);
      },
      deleteProduct: (state, action) => {
        state.items = state.items.map((product) =>
            product.id === action.payload ? { ...product, isDeleted: true } : product
          );
      },

}


  })
export const { setProducts, addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;