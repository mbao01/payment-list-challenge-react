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
import type { DataTableProps } from "./types";

export function DataTable<TData>({
  data,
  columns,
  footer,
  noResult,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>{noResult}</TableCell>
            </TableRow>
          )}
        </TableBodyWrapper>
        {footer && (
          <tfoot>
            <tr>
              <td colSpan={columns.length}>{footer}</td>
            </tr>
          </tfoot>
        )}
      </Table>
    </TableWrapper>
  );
}
