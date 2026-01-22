import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetPayments } from "./useGetPayments";
import * as paymentService from "@/services/payment";
import type { PaymentsResponse } from "@/types/payment";

vi.mock("@/services/payment");

const mockPaymentsResponse: PaymentsResponse = {
  payments: [
    {
      id: "pay_1",
      customerName: "John Doe",
      customerAddress: "123 Main St",
      amount: 100,
      currency: "USD",
      status: "completed",
      date: "2024-04-14T10:00:00Z",
      description: "Test payment",
    },
  ],
  total: 1,
  page: 1,
  pageSize: 5,
};

describe("useGetPayments", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("should fetch payments without parameters", async () => {
    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      mockPaymentsResponse,
    );

    // Trying to avoid suspense here so will pre-populate the cache
    await queryClient.prefetchQuery({
      queryKey: ["payments", undefined],
      queryFn: () => paymentService.getPaymentsService(undefined),
    });

    const { result } = renderHook(() => useGetPayments(), { wrapper });

    expect(result.current).toBeDefined();
    expect(paymentService.getPaymentsService).toHaveBeenCalledWith(undefined);
    expect(result.current.payments).toHaveLength(1);
    expect(result.current.payments[0].id).toBe("pay_1");
  });

  test("should fetch payments with filter parameters", async () => {
    const filters = { search: "pay_1", currency: "USD" };
    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      mockPaymentsResponse,
    );

    await queryClient.prefetchQuery({
      queryKey: ["payments", filters],
      queryFn: () => paymentService.getPaymentsService(filters),
    });

    const { result } = renderHook(() => useGetPayments(filters), { wrapper });

    expect(result.current).toBeDefined();
    expect(paymentService.getPaymentsService).toHaveBeenCalledWith(filters);
    expect(result.current.payments).toHaveLength(1);
  });

  test("should fetch payments with pagination parameters", async () => {
    const filters = { page: 2, pageSize: 10 };
    const paginatedResponse = {
      ...mockPaymentsResponse,
      page: 2,
      pageSize: 10,
    };
    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      paginatedResponse,
    );

    await queryClient.prefetchQuery({
      queryKey: ["payments", filters],
      queryFn: () => paymentService.getPaymentsService(filters),
    });

    const { result } = renderHook(() => useGetPayments(filters), { wrapper });

    expect(result.current).toBeDefined();
    expect(paymentService.getPaymentsService).toHaveBeenCalledWith(filters);
    expect(result.current.page).toBe(2);
    expect(result.current.pageSize).toBe(10);
  });

  test("should return all response properties", async () => {
    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      mockPaymentsResponse,
    );

    await queryClient.prefetchQuery({
      queryKey: ["payments", undefined],
      queryFn: () => paymentService.getPaymentsService(undefined),
    });

    const { result } = renderHook(() => useGetPayments(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty("payments");
    expect(result.current).toHaveProperty("total");
    expect(result.current).toHaveProperty("page");
    expect(result.current).toHaveProperty("pageSize");
    expect(result.current.total).toBe(1);
  });

  test("should update when parameters change", async () => {
    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      mockPaymentsResponse,
    );

    const { result, rerender } = renderHook(
      ({ params }) => useGetPayments(params),
      {
        wrapper,
        initialProps: { params: { search: "pay_1" } },
      },
    );

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    expect(paymentService.getPaymentsService).toHaveBeenCalledWith({
      search: "pay_1",
    });

    rerender({ params: { search: "pay_2" } });

    await waitFor(() => {
      expect(paymentService.getPaymentsService).toHaveBeenCalledWith({
        search: "pay_2",
      });
    });
  });

  test("should handle empty payments array", async () => {
    const emptyResponse = {
      payments: [],
      total: 0,
      page: 1,
      pageSize: 5,
    };
    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      emptyResponse,
    );

    await queryClient.prefetchQuery({
      queryKey: ["payments", undefined],
      queryFn: () => paymentService.getPaymentsService(undefined),
    });

    const { result } = renderHook(() => useGetPayments(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.payments).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  test("should handle multiple payments", async () => {
    const multiplePayments: PaymentsResponse = {
      payments: [
        { ...mockPaymentsResponse.payments[0], id: "pay_1" },
        { ...mockPaymentsResponse.payments[0], id: "pay_2" },
        { ...mockPaymentsResponse.payments[0], id: "pay_3" },
      ],
      total: 3,
      page: 1,
      pageSize: 5,
    };

    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      multiplePayments,
    );

    await queryClient.prefetchQuery({
      queryKey: ["payments", undefined],
      queryFn: () => paymentService.getPaymentsService(undefined),
    });

    const { result } = renderHook(() => useGetPayments(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.payments).toHaveLength(3);
    expect(result.current.total).toBe(3);
  });

  test("should use correct query key format", async () => {
    const filters = { search: "test", currency: "USD" };
    vi.mocked(paymentService.getPaymentsService).mockResolvedValue(
      mockPaymentsResponse,
    );

    renderHook(() => useGetPayments(filters), { wrapper });

    await waitFor(() => {
      expect(paymentService.getPaymentsService).toHaveBeenCalled();
    });

    const queryData = queryClient.getQueryData(["payments", filters]);
    expect(queryData).toBeDefined();
  });
});
