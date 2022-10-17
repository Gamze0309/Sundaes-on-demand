import { createContext, useContext, useState } from "react";

const OrderNumber = createContext();

export function useOrderNumber() {
  const contextValue = useContext(OrderNumber);

  if (!contextValue) {
    throw new Error(
      "useOrderNumber must be called from within an OrderNumberProvider"
    );
  }
  return contextValue;
}

export function OrderNumberProvider(props) {
  const [orderNumber, setOrderNumber] = useState(null);

  const updateOrderNumber = (newOrderNumber) => {
    setOrderNumber(newOrderNumber);
  };

  const values = { orderNumber, updateOrderNumber };

  return (
    <OrderNumber.Provider value={values} {...props}></OrderNumber.Provider>
  );
}
