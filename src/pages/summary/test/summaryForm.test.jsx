import { render, screen } from "@testing-library/react";
import SummaryForm from "../summaryForm";
import userEvent from "@testing-library/user-event";

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

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", () => {
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/No ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  const nullPopoverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopoverAgain).not.toBeInTheDocument();
});
