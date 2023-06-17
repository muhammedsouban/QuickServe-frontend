import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./Slice/userSlice";
import serviceReducer from "./Slice/serviceSlice";
import ServiceEditReducer from "./Slice/serviceEditSlice";
import cartReducer from "./Slice/cartSlice";
import locationReducer from "./Slice/locationSlice";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user","location"],
};

const rootReducer = combineReducers({
    service: serviceReducer,
    editservice: ServiceEditReducer,
    user: userReducer,    
    cart:cartReducer,
    location:locationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
