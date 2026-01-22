import { DataTable } from "@/components/DataTable";
import { useGetPayments } from "../../hooks/useGetPayments";
import { PAYMENTS_COLUMNS } from "./columns";

export const Payments = () => {
  const { payments } = useGetPayments();

  return <DataTable data={payments} columns={PAYMENTS_COLUMNS} />;
};
