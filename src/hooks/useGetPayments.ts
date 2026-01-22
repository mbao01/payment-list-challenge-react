import { useSuspenseQuery } from "@tanstack/react-query";
import { getPaymentsService } from "@/services/payment";
import type { PaymentFilter, PaymentsResponse } from "@/types/payment";

type UseGetPaymentsArgs = Partial<PaymentFilter>;

export const useGetPayments = (params?: UseGetPaymentsArgs) => {
  const queryKey = ["payments", params] as const;
  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: async ({ queryKey }): Promise<PaymentsResponse> => {
      const [, params] = queryKey;
      const response = await getPaymentsService(params);
      return response;
    },
  });

  return data;
};
