import { DataTable } from "@/components/DataTable";
import { useGetPayments } from "../../hooks/useGetPayments";
import { PAYMENTS_COLUMNS } from "./columns";
import { PaymentsFilters } from "./PaymentsFilters";
import { useState } from "react";
import { PaymentFilter } from "@/types/payment";

export const Payments = () => {
  const [filters, setFilters] = useState<Partial<PaymentFilter>>({});
  const { payments } = useGetPayments(filters);

  return (
    <>
      <PaymentsFilters onFilter={(filters) => setFilters(filters)} />
      <DataTable data={payments} columns={PAYMENTS_COLUMNS} />
    </>
  );
};
