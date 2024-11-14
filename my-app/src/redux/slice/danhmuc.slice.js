import { createSlice } from "@reduxjs/toolkit";



const danhMucSlice = createSlice({
    name: "danhmuc",
    initialState: {
        list_danhmuc: []
    },
    reducers: {
        setDanhMuc: (state, action) => {
            state.list_danhmuc = action.payload
        },
        setAddDanhMuc: (state, action) => {
            state.list_danhmuc.push(action.payload)
        },
        setEditDanhMuc: (state, action) => {
            const index = state.list_danhmuc.findIndex(item => item.ma_dm === action.payload.ma_dm);
            if (index !== -1) {
                state.list_danhmuc[index] = action.payload;
            }
        },
        setDeleteDanhMuc: (state, action) => {
            const index = state.list_danhmuc.findIndex(item => item.ma_dm === action.payload.ma_dm);
            if (index !== -1) {
                state.list_danhmuc.splice(index, 1);
            }
        }
    }
});

export const {
    setDanhMuc,
    setAddDanhMuc,
    setEditDanhMuc,
    setDeleteDanhMuc
} = danhMucSlice.actions;

export default danhMucSlice.reducer;
