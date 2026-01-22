import type { ReactNode } from "react";
import type { TableOptions } from "@tanstack/react-table";

export type DataTableProps<TData> = Pick<
  TableOptions<TData>,
  "data" | "columns"
> & {
  noResult?: ReactNode;
};

export type DataTableSkeletonProps<TData> = Pick<
  TableOptions<TData>,
  "columns"
> & {
  cells: ReactNode[];
  noOfRows: number;
};

export type DataTablePaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
};