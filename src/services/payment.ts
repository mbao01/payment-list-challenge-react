import { API_URL } from "@/constants";

type GetPaymentsServiceArgs = Partial<{
  search: string;
  currency: string;
  page: number;
  pageSize: number;
}>;

export const getPaymentsService = async (params?: GetPaymentsServiceArgs) => {
  const searchParams = new URLSearchParams(params as Record<string, string>);

  const response = await fetch(`${API_URL}?${searchParams}`);
  return response.json();
};
