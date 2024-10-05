import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk to fetch the currencies
export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    // Fetch data from both APIs
    const response = await axios.get(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
    );
    const responseNames = await axios.get(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
    );

    const eurRates = response.data.eur;
    const names = responseNames.data;

    // Prepare the payload
    const currencies = Object.entries(eurRates).map(([key, value]) => ({
      id: key,
      description: names[key],
      value: value as number,
    }));

    return currencies; // This will be passed as the payload in the fulfilled action
  }
);
