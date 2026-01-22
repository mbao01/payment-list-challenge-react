import { DataTableSkeleton } from "@/components/DataTable";
import { Shimmer } from "@/components/ui";
import { PAYMENTS_COLUMNS } from "./columns";

export const PaymentsSkeleton = () => {
  return (
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
  );
};
