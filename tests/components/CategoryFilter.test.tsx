import CategoryFilter from "@/components/productsTable/CategoryFilter";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http } from "msw";
import db from "../mocks/db";
import {
  simulateApiDelay,
  simulateApiEmptyResponse,
  simulateApiError,
} from "../mocks/server";
import TestProviders from "../TestProviders";

describe("CategoryFilter", () => {
  const renderComponent = () => {
    const onValueChange = vi.fn();
    const component = render(<CategoryFilter onValueChange={onValueChange} />, {
      wrapper: TestProviders,
    });

    return { component, onValueChange, user: userEvent.setup() };
  };

  const testDataAmount = 3;
  beforeEach(() => {
    Array(testDataAmount)
      .fill(null)
      .forEach(() => db.category.create());
  });

  it("should render nothing if fetching data", async () => {
    simulateApiDelay("/categories", http.get);
    const {
      component: { container },
    } = renderComponent();

    expect(container).toBeEmptyDOMElement();
  });

  it("should render nothing if data fetching failed", async () => {
    simulateApiError("/categories", http.get);
    const {
      component: { container },
    } = renderComponent();

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it("should render nothing if there are no categories", async () => {
    simulateApiEmptyResponse("/categories", http.get);
    const {
      component: { container },
    } = renderComponent();

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it("should render list of categories", async () => {
    const { user, onValueChange } = renderComponent();

    const select = await screen.findByRole("combobox");
    await user.click(select);

    const options = screen.getAllByRole("option");
    const categoriesOptions = options.slice(1);
    expect(categoriesOptions.length).toBe(testDataAmount);

    await user.click(categoriesOptions[0]);
    expect(onValueChange).toHaveBeenCalledOnce();
  });
});
