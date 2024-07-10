import { Button } from "@/components/ui/button";
import { TableState } from "@tanstack/react-table";

interface DataTablePaginationProps {
  previousPage: () => void;
  nextPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  getState: () => TableState;
  getPageCount: () => number;
}

const DataTablePagination = ({
  previousPage,
  nextPage,
  getCanPreviousPage,
  getCanNextPage,
  getState,
  getPageCount,
}: DataTablePaginationProps) => {
  const currentPage = getState().pagination.pageIndex + 1;
  const totalPages = getPageCount();

  return (
    <div className="flex items-center justify-end gap-4">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTablePagination;
