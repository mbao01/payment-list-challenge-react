import { PaymentFilter } from "@/types/payment";

export const hasActiveFilter = (filters?: Partial<PaymentFilter>) => {
  return filters && Object.values(filters).some(Boolean);
};
