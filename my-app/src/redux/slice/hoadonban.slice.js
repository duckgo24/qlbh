import { createSlice } from "@reduxjs/toolkit";


const hdbSlice = createSlice({
    name: "hdb",
    initialState: {
        list_hdb: [],
        filter_hdb: [],
        list_hdb_by_user: [],
        hdb_chua_thanh_toan_by_user: [],
        hdb_da_thanh_toan_by_user: [],
        list_hdb_cho_thanh_toan: []
    },
    reducers: {
        setListHDB: (state, action) => {
            state.list_hdb = action.payload;
        },
        setFilterHdb: (state, action) => {
            state.filter_hdb = action.payload;
        },
        setDeleteHDB: (state, action) => {
            const index = state.list_hdb.findIndex(item => item.ma_hdb === action.payload.ma_hdb);
            if (index !== -1) {
                state.list_hdb.splice(index, 1);
            }
        },

        //User
        setListHDBByUser: (state, action) => {
            state.list_hdb_by_user = action.payload;
        },

        setHDBChuaThanhToanByUser: (state, action) => {
            state.hdb_chua_thanh_toan_by_user = action.payload;
        },
        setListHDBChuaThanhToanByUser: (state, action) => {
            state.hdb_chua_thanh_toan_by_user = action.payload;
        },
        setUpdateHDBChuaThanhToan: (state, action) => {
            state.hdb_da_thanh_toan_by_user.push(action.payload);
        },
        setDeleteHDBChuaThanhToanByUser: (state, action) => {
            const index = state.hdb_chua_thanh_toan_by_user.findIndex(
                item => item.ma_hdb === action.payload.ma_hdb
            );
            if (index !== -1) {
                state.hdb_chua_thanh_toan_by_user.splice(index, 1);
            }

        },
        setListHDBChoThanhToanByUser: (state, action) => {
            state.list_hdb_cho_thanh_toan = action.payload;
        },
        setListHDBDaThanhToanByUser: (state, action) => {
            state.hdb_da_thanh_toan_by_user = action.payload;
        },
        setCreateHDBByUser: (state, action) => {
            state.list_hdb_by_user.push(action.payload);
        },
        setXoaHDB: (state, action) => {
            const index = state.list_hdb.findIndex(item => item.ma_hdb === action.payload.ma_hdb);
            if (index !== -1) {
                state.list_hdb.splice(index, 1);
            }
        },

    }
});


export const {
    setListHDB,
    setFilterHdb,
    setDeleteHDB,
    setListHDBByUser,
    setListHDBChuaThanhToanByUser,
    setDeleteHDBChuaThanhToanByUser,
    setUpdateHDBChuaThanhToan,
    setListHDBChoThanhToanByUser,
    setListHDBDaThanhToanByUser,
    setCreateHDBByUser,
    setXoaHDB,
} = hdbSlice.actions;

export default hdbSlice.reducer;