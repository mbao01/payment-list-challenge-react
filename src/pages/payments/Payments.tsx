import type { PaymentFilter } from "@/types/payment";
import { DataTable } from "@/components/DataTable";
import { ErrorBox, FlexRow } from "@/components/ui";
import { isErrorResult } from "@/utilities/errors/isErrorResult";
import { useGetPayments } from "../../hooks/useGetPayments";
import { PAYMENTS_COLUMNS } from "./columns";
import { Pagination } from "@/components/Pagination";
import { I18N } from "@/constants/i18n";

type PaymentsProps = {
  filters: Partial<PaymentFilter>;
  onPageChange: (page: number) => void;
};

export const Payments = ({ filters, onPageChange }: PaymentsProps) => {
  const result = useGetPayments(filters);

  if (isErrorResult(result)) {
    return <ErrorBox role="alert">{result.error.message}</ErrorBox>;
  }

  return (
    <DataTable
      data={result.payments}
      columns={PAYMENTS_COLUMNS}
      noResult={<FlexRow center>{I18N.NO_PAYMENTS_FOUND}</FlexRow>}
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
