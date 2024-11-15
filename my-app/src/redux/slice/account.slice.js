import { createSlice } from "@reduxjs/toolkit";



const accountSlice = createSlice({
    name: "account",
    initialState: {
        list_account: [],
        my_account: null
    },
    reducers: {
        setListAccount: (state, action) => {
            state.list_account = action.payload
        },
        setUpdateAccount: (state, action) => {
            state.list_account = state.list_account.map(account => {
                if (account.acc_id === action.payload.acc_id) {
                    return { ...account, ...action.payload }
                }
                return account
            })
        },
        setDeleteAccount: (state, action) => {
            const index = state.list_account.findIndex(acc => acc.acc_id === action.payload.acc_id);
            if (index !== -1) {
                state.list_account.splice(index, 1);
            }
        },
        setMyAccount: (state, action) => {
            state.my_account = action.payload
        },
        setUpdateMyAccount: (state, action) => {
            state.my_account = { ...state.my_account, ...action.payload }
        }
    }
});

export const {
    setMyAccount,
    setUpdateAccount,
    setDeleteAccount,
    setUpdateMyAccount,
    setListAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
