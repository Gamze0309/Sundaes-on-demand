import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />); //, { wrapper: OrderDetailsProvider }

  //make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent(0.0);

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when topping change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent(0.0);
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  await user.click(cherriesTopping);
  expect(toppingsSubtotal).toHaveTextContent(1.5);

  const hotFudgeTopping = await screen.findByRole("checkbox", {
    name: /Hot Fudge/i,
  });

  await user.click(hotFudgeTopping);
  expect(toppingsSubtotal).toHaveTextContent(3);

  await user.click(hotFudgeTopping);
  expect(toppingsSubtotal).toHaveTextContent(1.5);
});

describe("grand total,", () => {
  test("grand total starts at $0.00", () => {});

  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent(0.0);

    const user = userEvent.setup();
    const scoops = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(scoops);
    await user.type(scoops, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const toppings = await screen.findByRole("checkbox", { name: "Hot fudge" });
    await user.click(toppings);

    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    const topping = await screen.findByRole("checkbox", { name: "Hot fudge" });
    await user.click(topping);
    expect(grandTotal).toHaveTextContent("1.50");

    const scoop = await screen.findByRole("spinbutton", { name: "Chocolate" });
    await user.clear(scoop);
    await user.type(scoop, "1");

    expect(grandTotal).toHaveTextContent("3.5");
  });
  test("grand total updates properly if them is romoved", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    const scoop = await screen.findByRole("spinbutton", { name: "Chocolate" });
    await user.clear(scoop);
    await user.type(scoop, "2");

    await user.clear(scoop);
    await user.type(scoop, "1");

    const topping = await screen.findByRole("checkbox", { name: "M&Ms" });
    await user.click(topping);
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(topping);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
