

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import accountReducer from './slice/account.slice';
import productReducer from './slice/product.slice';
import danhMucReducer from './slice/danhmuc.slice';
import hdbReducer from './slice/hoadonban.slice'

import persistConfig from './persist.config';

const rootReducer = combineReducers({
    account: accountReducer,
    danhmuc: danhMucReducer,
    product: productReducer,
    hdb: hdbReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);