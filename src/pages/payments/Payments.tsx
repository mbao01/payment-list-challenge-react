import type { Dispatch, SetStateAction } from "react";
import type { PaymentFilter } from "@/types/payment";
import { DataTable } from "@/components/DataTable";
import { ErrorBox } from "@/components/ui";
import { isErrorResult } from "@/utilities/errors/isErrorResult";
import { useGetPayments } from "../../hooks/useGetPayments";
import { PAYMENTS_COLUMNS } from "./columns";
import { Pagination } from "@/components/Pagination";

type PaymentsProps = {
  filters: Partial<PaymentFilter>;
  setFilters: Dispatch<SetStateAction<Partial<PaymentFilter>>>;
};

export const Payments = ({ filters, setFilters }: PaymentsProps) => {
  const result = useGetPayments(filters);

  if (isErrorResult(result)) {
    return <ErrorBox role="alert">{result.error.message}</ErrorBox>;
  }

  return (
    <DataTable
      data={result.payments}
      columns={PAYMENTS_COLUMNS}
      footer={
        <Pagination
          page={filters.page}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      }
    />
  );
};
