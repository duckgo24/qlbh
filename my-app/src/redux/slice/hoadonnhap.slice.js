import { createSlice } from "@reduxjs/toolkit";

const hdnSlice = createSlice({
    name: "hdn",
    initialState: {
        list_hdn: [],
    },
    reducers: {
        setListHDN: (state, action) => {
            state.list_hdn = action.payload;
        },
        setFilterHDN: (state, action) => {
            state.filter_hdn = action.payload;
        },
        setHDNChuaThanhToan: (state, action) => {
            state.hdn_chua_thanh_toan = action.payload;
        },
        setHDNDaThanhToan: (state, action) => {
            state.hdn_da_thanh_toan = action.payload;
        },
        setAddHDN: (state, action) => {
            state.list_hdn.push(action.payload);
        },
        setDeleteHDN: (state, action) => {
            const index = state.list_hdn.findIndex(item => item.ma_hdn === action.payload.ma_hdn);
            if (index !== -1) {
                state.list_hdn.splice(index, 1);
            }
        }
    }
});

export const { setListHDN, setFilterHDN, setHDNChuaThanhToan, setHDNDaThanhToan, setAddHDN, setDeleteHDN } = hdnSlice.actions;
export default hdnSlice.reducer;