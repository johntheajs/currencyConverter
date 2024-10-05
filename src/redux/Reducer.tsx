import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrencies } from "../api/Fetch"; // Import the async thunk

// Define the shape of a single currency
interface Currency {
  id: string;
  description: string;
  value: number;
}

// Define the shape of the initial state
interface CurrencyState {
  currencies: Currency[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CurrencyState = {
  currencies: [], // An array of Currency objects
  status: "idle",
  error: null,
};

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    // Other reducers (if needed)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Since action.payload is expected to be an array of Currency
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Something went wrong";
      });
  },
});

export default currencySlice.reducer;
