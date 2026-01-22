import { Suspense } from "react";
import { Container, Title } from "@/components/ui";
import { Payments } from "./Payments";
import { PaymentsSkeleton } from "./PaymentsSkeleton";
import { I18N } from "@/constants/i18n";

export const PaymentsPage = () => {
  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <Suspense fallback={<PaymentsSkeleton />}>
        <Payments />
      </Suspense>
    </Container>
  );
};
