import { useState } from "react";
import { useSelector } from "react-redux";

interface Currency {
  id: string;
  description: string;
  value: number;
}

interface RootState {
  currencies: {
    currencies: Currency[]; // Notice the structure here
    status: string;
    error: string | null;
  };
}

const Form = () => {
  // Access the currencies array directly
  const currencies = useSelector(
    (state: RootState) => state.currencies.currencies
  );
  const status = useSelector((state: RootState) => state.currencies.status);

  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const fromCur = currencies.find((cur) => cur.id === fromCurrency);
    const toCur = currencies.find((cur) => cur.id === toCurrency);

    if (fromCur && toCur) {
      const eurAmount = amount / fromCur.value;
      const converted = eurAmount * toCur.value;
      setResult(converted);
    } else {
      setResult(null); // Handle case where currency is not found
    }
  };

  if (status === "loading") {
    return <div>Loading currencies...</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        placeholder="From Currency (e.g., usd)"
      />
      <input
        type="text"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        placeholder="To Currency (e.g., inr)"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />
      <button onClick={handleConvert}>Convert</button>
      <p>Result: {result !== null ? result : "Enter valid currencies"}</p>
    </div>
  );
};

export default Form;
