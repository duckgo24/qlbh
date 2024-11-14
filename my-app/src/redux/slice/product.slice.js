import { createSlice } from "@reduxjs/toolkit";



const productSlice = createSlice({
    name: "product",
    initialState: {
        list_product: [],
        productBestSales: [],
        productNews: [],
        productByDanhMuc: []
    },
    reducers: {
        setProductBestSale: (state, action) => {
            state.productBestSales = action.payload
        },
        setProductNew: (state, action) => {
            state.productNews = action.payload
        },
        setProductByDanhMuc: (state, action) => {
            state.productByDanhMuc = action.payload
        },
        setListProduct: (state, action) => {
            state.list_product = action.payload
        },
        setAddProduct: (state, action) => {
            state.list_product.push(action.payload)
        },
        setUpdateProduct: (state, action) => {
            const index = state.list_product.findIndex((product) => product.ma_sp === action.payload.ma_sp)
            state.list_product[index] = action.payload
        },
        setDeleteProduct: (state, action) => {
            const index = state.list_product.findIndex((product) => product.ma_sp === action.payload)
            state.list_product.splice(index, 1)
        }

    }
});

export const {
    setProductBestSale,
    setProductNew,
    setProductByDanhMuc,
    setListProduct,
    setAddProduct,
    setUpdateProduct,
    setDeleteProduct
} = productSlice.actions;

export default productSlice.reducer;
