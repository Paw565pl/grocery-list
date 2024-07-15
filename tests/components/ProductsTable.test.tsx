import ProductsTable from "@/components/productsTable";
import Product from "@/entities/product";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http } from "msw";
import db from "../mocks/db";
import {
  simulateApiDelay,
  simulateApiEmptyResponse,
  simulateApiError,
} from "../mocks/server";
import TestProviders from "../TestProviders";

describe("ProductsTable", () => {
  const renderComponent = () => {
    render(<ProductsTable />, { wrapper: TestProviders });

    return {
      user: userEvent.setup(),
    };
  };

  let testData: Product[] = [];
  beforeEach(() => {
    for (let i = 0; i < 5; i++) {
      testData.push(db.product.create());
    }
  });

  afterEach(() => {
    testData = [];
  });

  it("should render spinner if data is loading", () => {
    simulateApiDelay("/products", http.get);
    renderComponent();

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  it("should render error message if data fetching failed", async () => {
    simulateApiError("/products", http.get);
    renderComponent();

    const error = await screen.findByRole("paragraph");
    expect(error).toHaveTextContent(/error/i);
  });

  it("should render message if there are no products", async () => {
    simulateApiEmptyResponse("/products", http.get);
    renderComponent();

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument();
  });

  it("should render products in table", async () => {
    renderComponent();

    const rows = await screen.findAllByRole("row");
    const dataRows = rows.slice(1);

    expect(dataRows).toHaveLength(testData.length);
    dataRows.forEach((_, i) => {
      const name = screen.getByText(new RegExp(testData[i].name, "i"));
      const price = screen.getByText(testData[i].price.toString());

      expect(name).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });

  it("should render filtered products if category filter is selected", async () => {
    const category = db.category.create();
    const product = db.product.create({ categoryId: category.id });
    const filteredProducts = testData
      .filter((e) => e.categoryId === category.id)
      .concat(product);

    const { user } = renderComponent();
    const categoryFilter = await screen.findByRole("combobox");
    await user.click(categoryFilter);

    const option = screen.getByRole("option", {
      name: new RegExp(category.name, "i"),
    });
    await user.click(option);

    const rows = screen.getAllByRole("row");
    const dataRows = rows.slice(1);

    expect(dataRows).toHaveLength(filteredProducts.length);
    dataRows.forEach((_, i) => {
      const name = screen.getByText(new RegExp(filteredProducts[i].name, "i"));
      const price = screen.getByText(filteredProducts[i].price.toString());

      expect(name).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });

  it('should render next page if "next" button is clicked', async () => {
    for (let i = 0; i < 15; i++) {
      testData.push(db.product.create());
    }
    const secondPageData = testData.slice(10);
    const { user } = renderComponent();

    const nextButton = await screen.findByRole("button", { name: /next/i });
    await user.click(nextButton);

    const rows = screen.getAllByRole("row");
    const dataRows = rows.slice(1);

    expect(dataRows).toHaveLength(secondPageData.length);
    dataRows.forEach((_, i) => {
      const name = screen.getByText(new RegExp(secondPageData[i].name, "i"));
      const price = screen.getByText(secondPageData[i].price.toString());

      expect(name).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });
});
