"use client";

import DataTablePagination from "@/components/common/DataTablePagination";
import { Spinner } from "@/components/common/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Product from "@/entities/product";
import useProducts from "@/hooks/useProducts";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import QuantitySelector from "./QuantitySelector";

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
];

const ProductsTable = () => {
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const { data: products, isLoading, isError } = useProducts();
  const filteredProducts = useMemo(
    () =>
      !categoryFilter
        ? products
        : products?.filter((product) => product.categoryId === categoryFilter),
    [categoryFilter, products],
  );

  const {
    getHeaderGroups,
    getRowModel,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    getState,
    getPageCount,
  } = useReactTable({
    data: filteredProducts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <Spinner size={48} />;
  if (isError)
    return (
      <p className="text-red-600">
        An unxepected error has occurred. Try again later.
      </p>
    );

  return (
    <section className="xl:w-7/12">
      <CategoryFilter
        onValueChange={(value) =>
          setCategoryFilter(value === "all" ? null : parseInt(value))
        }
      />
      <Table className="sm:table-fixed">
        <TableHeader className="font-bold sm:text-lg">
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
              <TableHead />
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {getRowModel().rows?.length ? (
            getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <QuantitySelector product={row.original} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No products available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination
        nextPage={nextPage}
        previousPage={previousPage}
        getCanNextPage={getCanNextPage}
        getCanPreviousPage={getCanPreviousPage}
        getState={getState}
        getPageCount={getPageCount}
      />
    </section>
  );
};

export default ProductsTable;
