import { render, screen } from "@testing-library/react";
import SummaryForm from "../summaryForm";
import userEvent from "@testing-library/user-event";
import { OrderNumberProvider } from "../../../context/OrderNumber";

test("checkbox and button have correct initial value", () => {
  render(<SummaryForm />, { wrapper: OrderNumberProvider });
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

test("button enabled after that checkbox checked", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />, { wrapper: OrderNumberProvider });

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />, { wrapper: OrderNumberProvider });

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popover = screen.getByText(/o ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  const nullPopoverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopoverAgain).not.toBeInTheDocument();
});
