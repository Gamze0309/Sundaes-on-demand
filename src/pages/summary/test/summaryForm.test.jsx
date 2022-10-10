import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../summaryForm";

test("checkbox and button have correct initial value", () => {
  render(<SummaryForm />);
  // Find checkbox by it's name
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  // İnitially, checkbox not to be checked
  expect(checkbox).not.toBeChecked();

  // checkbox not checked so button is disabled
  expect(button).toBeDisabled();
});

test("button enabled after that checkbox checked", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
