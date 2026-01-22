import { Suspense } from "react";
import { Container, Title } from "@/components/ui";
import { Payments } from "./Payments";
import { PaymentsSkeleton } from "./PaymentsSkeleton";
import { I18N } from "@/constants/i18n";
import { PaymentsFilters } from "./PaymentsFilters";
import { useSearchParams } from "@/hooks/useSearchParams";
import { PaymentFilter } from "@/types/payment";

export const PaymentsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

  const handleFilter = ({
    search,
    currency,
  }: Pick<PaymentFilter, "search" | "currency">) => {
    setSearchParams({ search, currency, page: 1 });
  };

  const handlePage = (page: number) => {
    setSearchParams({ ...filters, page });
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <PaymentsFilters defaultValues={filters} onFilter={handleFilter} />

      <Suspense fallback={<PaymentsSkeleton />}>
        <Payments filters={filters} onPageChange={handlePage} />
      </Suspense>
    </Container>
  );
};
