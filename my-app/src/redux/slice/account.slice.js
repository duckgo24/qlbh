import { createSlice } from "@reduxjs/toolkit";



const accountSlice = createSlice({
    name: "account",
    initialState: {
        my_account: null
    },
    reducers: {
        setListAccount: (state, action) => {
            state.list_account = action.payload
        },
        setAccount: (state, action) => {
            state.my_account = action.payload
        },
        setUpdateAccount: (state, action) => {
            state.my_account = { ...state.my_account, ...action.payload }
        }
    }
});

export const {
    setAccount,
    setUpdateAccount,
    setListAccount,
} = accountSlice.actions;
export default accountSlice.reducer;
