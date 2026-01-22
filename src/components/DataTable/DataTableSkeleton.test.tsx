import type { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTableSkeleton } from "./DataTableSkeleton";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

describe("DataTableSkeleton", () => {
  it("render static cells in table correctly", () => {
    render(
      <DataTableSkeleton
        columns={columns}
        noOfRows={3}
        cells={[
          <span data-testid="name" />,
          <span data-testid="email" />,
          <span data-testid="role" />,
        ]}
      />,
    );

    expect(screen.getAllByTestId("name")).toHaveLength(3);
    expect(screen.getAllByTestId("email")).toHaveLength(3);
    expect(screen.getAllByTestId("role")).toHaveLength(3);
  });
});
