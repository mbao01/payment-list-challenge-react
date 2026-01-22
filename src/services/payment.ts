import { API_URL } from "@/constants";
import type { PaymentFilter, PaymentsResponse } from "@/types/payment";
import { handleApiError } from "@/utilities/errors/handleApiError";

type GetPaymentsServiceArgs = PaymentFilter;

export const getPaymentsService = async (params?: GetPaymentsServiceArgs) => {
  try {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          searchParams.set(key, String(value));
        }
      });
    }

    const response = await fetch(`${API_URL}?${searchParams}`);

    if (!response.ok) {
      throw response;
    }

    return response.json() as Promise<PaymentsResponse>;
  } catch (error) {
    const apiError = await handleApiError(error);
    return { error: apiError };
  }
};
