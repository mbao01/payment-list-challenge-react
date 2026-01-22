import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
  TableWrapper,
} from "@/components/ui";
import type { DataTableSkeletonProps } from "./types";

export const DataTableSkeleton = <TData,>({
  cells,
  columns,
  noOfRows,
}: DataTableSkeletonProps<TData>) => {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = Array.from({ length: noOfRows }).map(
    (_, index) => `DataTableSkeleton_Row_${index}`,
  );

  return (
    <TableWrapper>
      <Table>
        <TableHeaderWrapper>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeader key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeader>
                );
              })}
            </TableHeaderRow>
          ))}
        </TableHeaderWrapper>
        <TableBodyWrapper>
          {rows.map((rowId) => (
            <TableRow key={rowId}>
              {cells.map((cell, index) => (
                <TableCell key={`${rowId}_Column_${index}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBodyWrapper>
      </Table>
    </TableWrapper>
  );
};
