import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import AlertBanner from "../common/AlertBanner";
import { useOrderNumber } from "../../context/OrderNumber";

const SummaryForm = ({ setOrderPhase }) => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const { updateOrderNumber } = useOrderNumber();

  function handleSubmit(event) {
    event.preventDefault();

    setOrderPhase("completed");
  }

  const handleClick = () => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => updateOrderNumber(response.data.orderNumber))
      .catch((error) => setError(true));
  };

  if (error) {
    return <AlertBanner />;
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const chLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
          label={chLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="btn btn-dark"
        disabled={!disabled}
        onClick={handleClick}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
