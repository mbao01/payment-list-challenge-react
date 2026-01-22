import { DataTableSkeleton } from "@/components/DataTable";
import { PAYMENTS_COLUMNS } from "./columns";
import { Shimmer } from "@/components/ui";
import { PaymentsFiltersSkeleton } from "./PaymentsFiltersSkeleton";

export const PaymentsSkeleton = () => {
  return (
    <>
      <PaymentsFiltersSkeleton />
      <DataTableSkeleton
        columns={PAYMENTS_COLUMNS}
        noOfRows={5}
        cells={[
          <Shimmer />,
          <Shimmer />,
          <Shimmer />,
          <Shimmer />,
          <Shimmer />,
          <Shimmer />,
        ]}
      />
    </>
  );
};
