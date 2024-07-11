import DataTablePagination from "@/components/common/DataTablePagination";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DataTablePagination", () => {
  const state = { pagination: { pageIndex: 0 } };
  const mocks = {
    nextPage: vi.fn(),
    previousPage: vi.fn(),
    getCanNextPage: vi.fn(),
    getCanPreviousPage: vi.fn(),
    getState: vi.fn().mockReturnValue(state),
    getPageCount: vi.fn(),
  };

  const renderComponent = (props?: Partial<typeof mocks>) => {
    render(<DataTablePagination {...mocks} {...props} />);

    return {
      mocks,
      user: userEvent.setup(),
      previousButton: screen.getByRole("button", { name: /previous/i }),
      nextButton: screen.getByRole("button", { name: /next/i }),
    };
  };

  it("should render disabled previous button if no previous page exists", () => {
    const {
      previousButton,
      mocks: { previousPage },
    } = renderComponent();

    expect(previousButton).toBeDisabled();
    expect(previousPage).not.toBeCalled();
  });

  it("should render disabled next button if no next page exists", () => {
    const {
      nextButton,
      mocks: { nextPage },
    } = renderComponent();

    expect(nextButton).toBeDisabled();
    expect(nextPage).not.toBeCalled();
  });

  it("should call previousPage callback if previous button is clicked", async () => {
    const getCanPreviousPage = vi.fn().mockReturnValue(true);
    const {
      user,
      previousButton,
      mocks: { previousPage },
    } = renderComponent({ getCanPreviousPage });

    await user.click(previousButton);

    expect(previousButton).toBeEnabled();
    expect(previousPage).toHaveBeenCalledOnce();
  });

  it("should call nextPage callback if next button is clicked", async () => {
    const getCanNextPage = vi.fn().mockReturnValue(true);
    const {
      user,
      nextButton,
      mocks: { nextPage },
    } = renderComponent({ getCanNextPage });

    await user.click(nextButton);

    expect(nextButton).toBeEnabled();
    expect(nextPage).toHaveBeenCalledOnce();
  });
});
