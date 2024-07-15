import CategoryFilter from "@/components/productsTable/CategoryFilter";
import Category from "@/entities/category";
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
    const view = render(<CategoryFilter onValueChange={onValueChange} />, {
      wrapper: TestProviders,
    });

    return { view, onValueChange, user: userEvent.setup() };
  };

  let testData: Category[] = [];
  beforeEach(() => {
    for (let i = 0; i < 2; i++) {
      testData.push(db.category.create());
    }
  });

  afterEach(() => {
    testData = [];
  });

  it("should render nothing if fetching data", async () => {
    simulateApiDelay("/categories", http.get);
    const {
      view: { container },
    } = renderComponent();

    expect(container).toBeEmptyDOMElement();
  });

  it("should render nothing if data fetching failed", async () => {
    simulateApiError("/categories", http.get);
    const {
      view: { container },
    } = renderComponent();

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it("should render nothing if there are no categories", async () => {
    simulateApiEmptyResponse("/categories", http.get);
    const {
      view: { container },
    } = renderComponent();

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it("should render list of categories", async () => {
    const { user } = renderComponent();

    const select = await screen.findByRole("combobox");
    await user.click(select);

    const options = screen.getAllByRole("option");
    const categoriesOptions = options.slice(1);

    expect(categoriesOptions).toHaveLength(testData.length);
    categoriesOptions.forEach((_, i) => {
      const option = screen.getByText(new RegExp(testData[i].name, "i"));
      expect(option).toBeInTheDocument();
    });
  });

  it("should call onValueChange if option is selected", async () => {
    const { user, onValueChange } = renderComponent();

    const select = await screen.findByRole("combobox");
    await user.click(select);

    const options = screen.getAllByRole("option");
    const categoriesOptions = options.slice(1);

    const option = categoriesOptions[0];
    await user.click(option);

    expect(select).toHaveTextContent(option.textContent || "");
    expect(onValueChange).toHaveBeenCalledOnce();
  });
});
