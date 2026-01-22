import { FilterRow, Shimmer } from "@/components/ui";

export const PaymentsFiltersSkeleton = () => {
  return (
    <FilterRow>
      <Shimmer width={16} height={1.5} />
      <Shimmer width={4} height={1.5} />
    </FilterRow>
  );
};
