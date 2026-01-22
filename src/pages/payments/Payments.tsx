import { DataTable } from "@/components/DataTable";
import { useGetPayments } from "../../hooks/useGetPayments";
import { PAYMENTS_COLUMNS } from "./columns";
import { PaymentFilter } from "@/types/payment";

type PaymentsProps = {
  filters: Partial<PaymentFilter>;
};

export const Payments = ({ filters }: PaymentsProps) => {
  const { payments } = useGetPayments(filters);

  return <DataTable data={payments} columns={PAYMENTS_COLUMNS} />;
};
