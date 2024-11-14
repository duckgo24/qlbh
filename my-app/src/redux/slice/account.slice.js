import { createSlice } from "@reduxjs/toolkit";



const accountSlice = createSlice({
    name: "account",
    initialState: {
        my_account: null
    },
    reducers: {
        setAccount: (state, action) => {
            state.my_account = action.payload
        },
        setUpdateAccount: (state, action) => {
            state.my_account = {...state.my_account, ...action.payload}
        }
    }
});

export const { 
    setAccount,
    setUpdateAccount
} = accountSlice.actions;
export default accountSlice.reducer;
