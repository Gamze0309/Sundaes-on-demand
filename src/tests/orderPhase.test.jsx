import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  // Don't need to wrap in provider; already wrapped
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const hotFudgeTopping = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "2");
  await user.click(hotFudgeTopping);

  // find and click order button
  const btnOrder = screen.getByRole("button", { name: "Order Sundae!" });
  await user.click(btnOrder);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Hot fudge")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const btnConfirmOrder = screen.getByRole("button", { name: "Confirm order" });
  const checkTerms = screen.getByRole("checkbox", { name: /I agree to/i });

  await user.click(checkTerms);
  await user.click(btnConfirmOrder);

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText("Your order number is ", {
    exact: false,
  });
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const btnNewOrder = screen.getByRole("button", { name: "Create new order" });
  await user.click(btnNewOrder);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  // happening after test is over
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Hot fudge" });
});
