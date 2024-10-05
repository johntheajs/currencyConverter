import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrencies } from "./api/Fetch";
import Form from "./components/Form";
import { AppDispatch } from "./redux/Store"; // Import the AppDispatch type

const App = () => {
  const dispatch: AppDispatch = useDispatch(); // Use typed dispatch

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <div>
      <h1>Currency Converter</h1>
      <Form />
    </div>
  );
};

export default App;
