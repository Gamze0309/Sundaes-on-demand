import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(false);

  const chLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
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
