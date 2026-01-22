import { Suspense, useState } from "react";
import { Container, Title } from "@/components/ui";
import { Payments } from "./Payments";
import { PaymentsSkeleton } from "./PaymentsSkeleton";
import { I18N } from "@/constants/i18n";
import { PaymentsFilters } from "./PaymentsFilters";
import { PaymentFilter } from "@/types/payment";

export const PaymentsPage = () => {
  const [filters, setFilters] = useState<Partial<PaymentFilter>>({});

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <PaymentsFilters onFilter={(filters) => setFilters(filters)} />

      <Suspense fallback={<PaymentsSkeleton />}>
        <Payments filters={filters} setFilters={setFilters} />
      </Suspense>
    </Container>
  );
};
