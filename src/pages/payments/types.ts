import type { Payment, PaymentFilter } from "@/types/payment";

export type PaymentsProps = {
  payments: Payment[];
};

export type PaymentsTableProps = {
  payments: Payment[];
};

export type PaymentsFiltersProps = {
  defaultValues?: PaymentFilter;
  onFilter: (filters: PaymentFilter) => void;
};
