import { API_URL } from "@/constants";
import type { PaymentFilter } from "@/types/payment";

type GetPaymentsServiceArgs = PaymentFilter;

export const getPaymentsService = async (params?: GetPaymentsServiceArgs) => {
  const searchParams = new URLSearchParams(params as Record<string, string>);

  const response = await fetch(`${API_URL}?${searchParams}`);
  return response.json();
};
