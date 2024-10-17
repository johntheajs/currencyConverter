import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Form as BootstrapForm,
  Container,
  Row,
  Col,
} from "react-bootstrap";

interface Currency {
  id: string;
  description: string;
  value: number;
}

interface RootState {
  currencies: {
    currencies: Currency[];
    status: string;
    error: string | null;
  };
}

const Form = () => {
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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Currency Converter
              </Card.Title>
              <BootstrapForm>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>From Currency</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    placeholder="From Currency (e.g., usd)"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>To Currency</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    placeholder="To Currency (e.g., inr)"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Amount</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Amount"
                  />
                </BootstrapForm.Group>

                <div className="text-center">
                  <Button variant="primary" onClick={handleConvert}>
                    Convert
                  </Button>
                </div>
              </BootstrapForm>

              <p className="text-center mt-4">
                Result: {result !== null ? result : "Enter valid currencies"}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Form;
