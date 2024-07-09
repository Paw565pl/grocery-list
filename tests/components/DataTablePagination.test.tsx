import DataTablePagination from "@/components/common/DataTablePagination";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DataTablePagination", () => {
  const getElements = () => ({
    user: userEvent.setup(),
    previousButton: screen.getByRole("button", { name: /previous/i }),
    nextButton: screen.getByRole("button", { name: /next/i }),
  });

  it("should render disabled previous button if no previous page exists", () => {
    const previousPage = vi.fn();
    render(
      <DataTablePagination
        nextPage={vi.fn()}
        previousPage={previousPage}
        getCanNextPage={vi.fn()}
        getCanPreviousPage={vi.fn().mockReturnValue(false)}
      />,
    );

    const { previousButton } = getElements();

    expect(previousPage).not.toBeCalled();
    expect(previousButton).toBeDisabled();
  });

  it("should render disabled next button if no next page exists", () => {
    const nextPage = vi.fn();
    render(
      <DataTablePagination
        nextPage={nextPage}
        previousPage={vi.fn()}
        getCanNextPage={vi.fn().mockReturnValue(false)}
        getCanPreviousPage={vi.fn()}
      />,
    );

    const { nextButton } = getElements();

    expect(nextPage).not.toBeCalled();
    expect(nextButton).toBeDisabled();
  });

  it("should call previousPage callback if previous button is clicked", async () => {
    const previousPage = vi.fn();
    render(
      <DataTablePagination
        nextPage={vi.fn()}
        previousPage={previousPage}
        getCanNextPage={vi.fn()}
        getCanPreviousPage={vi.fn().mockReturnValue(true)}
      />,
    );

    const { user, previousButton } = getElements();

    await user.click(previousButton);

    expect(previousPage).toBeCalled();
    expect(previousButton).toBeEnabled();
  });

  it("should call nextPage callback if next button is clicked", async () => {
    const nextPage = vi.fn();
    render(
      <DataTablePagination
        nextPage={nextPage}
        previousPage={vi.fn()}
        getCanNextPage={vi.fn().mockReturnValue(true)}
        getCanPreviousPage={vi.fn()}
      />,
    );

    const { user, nextButton } = getElements();

    await user.click(nextButton);

    expect(nextPage).toBeCalled();
    expect(nextButton).toBeEnabled();
  });
});
