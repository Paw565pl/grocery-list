import DataTablePagination from "@/components/common/DataTablePagination";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DataTablePagination", () => {
  it("should render disabled previous button if no previous page exists", () => {
    const previousPage = vi.fn();
    render(<DataTablePagination {...getProps()} previousPage={previousPage} />);

    const { previousButton } = getElements();

    expect(previousButton).toBeDisabled();
    expect(previousPage).not.toBeCalled();
  });

  it("should render disabled next button if no next page exists", () => {
    const nextPage = vi.fn();
    render(
      <DataTablePagination
        {...getProps()}
        nextPage={nextPage}
        getCanNextPage={vi.fn().mockReturnValue(false)}
      />,
    );

    const { nextButton } = getElements();

    expect(nextButton).toBeDisabled();
    expect(nextPage).not.toBeCalled();
  });

  it("should call previousPage callback if previous button is clicked", async () => {
    const previousPage = vi.fn();
    render(
      <DataTablePagination
        {...getProps()}
        previousPage={previousPage}
        getCanPreviousPage={vi.fn().mockReturnValue(true)}
      />,
    );

    const { user, previousButton } = getElements();

    await user.click(previousButton);

    expect(previousButton).toBeEnabled();
    expect(previousPage).toHaveBeenCalledOnce();
  });

  it("should call nextPage callback if next button is clicked", async () => {
    const nextPage = vi.fn();
    render(
      <DataTablePagination
        {...getProps()}
        nextPage={nextPage}
        getCanNextPage={vi.fn().mockReturnValue(true)}
      />,
    );

    const { user, nextButton } = getElements();

    await user.click(nextButton);

    expect(nextButton).toBeEnabled();
    expect(nextPage).toHaveBeenCalledOnce();
  });

  const state = { pagination: { pageIndex: 0 } };
  const getElements = () => ({
    user: userEvent.setup(),
    previousButton: screen.getByRole("button", { name: /previous/i }),
    nextButton: screen.getByRole("button", { name: /next/i }),
    currentPage: screen.getByText(/\d+/),
    totalPages: screen.getByText(/\d+/),
  });

  const getProps = () => ({
    nextPage: vi.fn(),
    previousPage: vi.fn(),
    getCanNextPage: vi.fn(),
    getCanPreviousPage: vi.fn(),
    getState: vi.fn().mockReturnValue(state),
    getPageCount: vi.fn(),
  });
});
