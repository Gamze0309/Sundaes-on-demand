import { useOrderNumber } from "../../context/OrderNumber";
import { useOrderDetails } from "../../context/OrderDetails";
import Button from "react-bootstrap/Button";

const OrderConfirmation = ({ setOrderPhase }) => {
  const { orderNumber } = useOrderNumber();
  const { resetOrder } = useOrderDetails();

  if (!orderNumber) {
    return <div>Loading</div>;
  }

  const handleClick = () => {
    resetOrder();

    // send back to order page
    setOrderPhase("inProgress");
  };

  return (
    <>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button
        variant="primary"
        type="submit"
        className="btn btn-dark"
        onClick={handleClick}
      >
        Create new order
      </Button>
    </>
  );
};

export default OrderConfirmation;
