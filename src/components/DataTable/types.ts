import type { ReactNode } from "react";
import type { TableOptions } from "@tanstack/react-table";

export type DataTableProps<TData> = Pick<
  TableOptions<TData>,
  "data" | "columns"
> & {
  noResult?: ReactNode;
  footer?: ReactNode;
};

export type DataTableSkeletonProps<TData> = Pick<
  TableOptions<TData>,
  "columns"
> & {
  cells: ReactNode[];
  noOfRows: number;
};
