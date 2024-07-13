/* eslint-disable @typescript-eslint/no-non-null-assertion */
import QuantitySelector from "@/components/productsTable/QuantitySelector";
import Product from "@/entities/product";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import db from "../mocks/db";
import TestProviders from "../TestProviders";

describe("QuantitySelector", () => {
  let product: Product;
  beforeEach(() => {
    product = db.product.create();
  });

  const renderComponent = () => {
    render(<QuantitySelector product={product} />, { wrapper: TestProviders });

    const getAddToListButton = () =>
      screen.queryByRole("button", { name: /add/i });
    const getDecrementButton = () =>
      screen.queryByRole("button", { name: /-/i });
    const getIncrementButton = () =>
      screen.queryByRole("button", { name: /\+/i });
    const getQuantity = () => screen.queryByText(/\d+/);

    return {
      user: userEvent.setup(),
      getAddToListButton,
      getDecrementButton,
      getIncrementButton,
      getQuantity,
    };
  };

  it("should render add to list button if product is not in the list", () => {
    const {
      getAddToListButton,
      getDecrementButton,
      getIncrementButton,
      getQuantity,
    } = renderComponent();

    expect(getAddToListButton()).toBeInTheDocument();
    expect(getDecrementButton()).not.toBeInTheDocument();
    expect(getIncrementButton()).not.toBeInTheDocument();
    expect(getQuantity()).not.toBeInTheDocument();
  });

  it("should add product to the list and render decrement and increment buttons if add to list button is clicked", async () => {
    const {
      user,
      getAddToListButton,
      getDecrementButton,
      getIncrementButton,
      getQuantity,
    } = renderComponent();

    const addToListButton = getAddToListButton()!;

    await user.click(addToListButton);

    expect(addToListButton).not.toBeInTheDocument();
    expect(getDecrementButton()).toBeInTheDocument();
    expect(getIncrementButton()).toBeInTheDocument();
    expect(getQuantity()).toHaveTextContent("1");
  });

  it("should increment the quantity if increment button is clicked", async () => {
    const { user, getAddToListButton, getIncrementButton, getQuantity } =
      renderComponent();
    await user.click(getAddToListButton()!);

    await user.click(getIncrementButton()!);

    expect(getQuantity()).toHaveTextContent("2");
  });

  it("should decrement the quantity if decrement button is clicked", async () => {
    const {
      user,
      getAddToListButton,
      getDecrementButton,
      getIncrementButton,
      getQuantity,
    } = renderComponent();
    await user.click(getAddToListButton()!);
    await user.click(getIncrementButton()!);

    await user.click(getDecrementButton()!);

    expect(getQuantity()).toHaveTextContent("1");
  });

  it("should render add to list button if product is removed from the list", async () => {
    const {
      user,
      getAddToListButton,
      getDecrementButton,
      getIncrementButton,
      getQuantity,
    } = renderComponent();
    await user.click(getAddToListButton()!);

    await user.click(getDecrementButton()!);

    expect(getAddToListButton()).toBeInTheDocument();
    expect(getDecrementButton()).not.toBeInTheDocument();
    expect(getIncrementButton()).not.toBeInTheDocument();
    expect(getQuantity()).not.toBeInTheDocument();
  });
});
