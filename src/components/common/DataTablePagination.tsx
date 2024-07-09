import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
  previousPage: () => void;
  nextPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}
const DataTablePagination = ({
  previousPage,
  nextPage,
  getCanPreviousPage,
  getCanNextPage,
}: DataTablePaginationProps) => {
  return (
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
  );
};

export default DataTablePagination;
