import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

// const Example = () => (
//   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
//     <Button variant="success">Click me to see</Button>
//   </OverlayTrigger>
// );

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const chLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form>
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
        class="btn btn-dark"
        disabled={!disabled}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
