import type { PaymentFilter } from "@/types/payment";
import { DataTable } from "@/components/DataTable";
import { ErrorBox } from "@/components/ui";
import { isErrorResult } from "@/utilities/errors/isErrorResult";
import { useGetPayments } from "../../hooks/useGetPayments";
import { PAYMENTS_COLUMNS } from "./columns";
import { Pagination } from "@/components/Pagination";

type PaymentsProps = {
  filters: Partial<PaymentFilter>;
  onPageChange: (page: number) => void;
};

export const Payments = ({ filters, onPageChange }: PaymentsProps) => {
  const result = useGetPayments(filters);

  if (isErrorResult(result)) {
    return <ErrorBox role="alert">{result.error.message}</ErrorBox>;
  }

  console.log(result);

  return (
    <DataTable
      data={result.payments}
      columns={PAYMENTS_COLUMNS}
      footer={
        <Pagination
          page={result.page}
          totalItems={result.total}
          pageSize={result.pageSize}
          onPageChange={onPageChange}
        />
      }
    />
  );
};
