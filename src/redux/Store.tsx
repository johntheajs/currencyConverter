import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./Reducer";

// Create the store
const store = configureStore({
  reducer: {
    currencies: currencyReducer,
  },
});

// Define types for the state and dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
