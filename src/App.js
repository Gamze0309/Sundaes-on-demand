import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";
import { OrderNumberProvider } from "./context/OrderNumber";
import OrderConfirmation from "./pages/complete/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";
import { useState } from "react";

function App() {
  // orderPhase needs to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <OrderDetailsProvider>
      <OrderNumberProvider>
        <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
      </OrderNumberProvider>
    </OrderDetailsProvider>
  );
}

export default App;
