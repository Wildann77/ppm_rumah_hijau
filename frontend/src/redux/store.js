import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import plantsApi from "./features/plants/plantsApi";
import ordersApi from "./features/orders/ordersApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // default: localStorage

// Gabungkan semua reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  [plantsApi.reducerPath]: plantsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});

// Konfigurasi persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // hanya simpan cart
};

// Reducer yang dipersist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store dengan middleware khusus redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(plantsApi.middleware, ordersApi.middleware),
});

export const persistor = persistStore(store);
