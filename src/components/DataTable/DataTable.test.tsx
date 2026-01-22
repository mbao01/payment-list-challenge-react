import type { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./DataTable";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
];

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

describe("DataTable", () => {
  it("should display table headers and data correctly", () => {
    render(<DataTable data={users} columns={columns} />);

    // Table header
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: "Email" })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: "Role" })).toBeVisible();

    // Table body
    expect(screen.getByRole("cell", { name: "John Doe" })).toBeVisible();
    expect(screen.getByRole("cell", { name: "Jane Smith" })).toBeVisible();
    expect(
      screen.getByRole("cell", { name: "john@example.com" }),
    ).toBeVisible();
    expect(
      screen.getByRole("cell", { name: "jane@example.com" }),
    ).toBeVisible();
  });

  it("shows no result message when data is empty", () => {
    render(<DataTable data={[]} columns={columns} noResult="No users found" />);

    expect(screen.getByText("No users found")).toBeVisible();
  });
});
