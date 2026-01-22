import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "@/mocks/node";
import { getPaymentsService } from "./payment";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("getPaymentsService", () => {
  describe("Successful API calls", () => {
    test("should fetch payments without parameters", async () => {
      const result = await getPaymentsService();

      expect(result).toBeDefined();
      expect(result.payments).toBeDefined();
      expect(Array.isArray(result.payments)).toBe(true);
      expect(result.payments.length).toBeGreaterThan(0);
      expect(result.total).toBeDefined();
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    test("should fetch payments with default pagination (page=1, pageSize=5)", async () => {
      const result = await getPaymentsService({ page: 1, pageSize: 5 });

      expect(result.payments).toHaveLength(5);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    test("should fetch payments with custom page size", async () => {
      const result = await getPaymentsService({ page: 1, pageSize: 10 });

      expect(result.payments.length).toBeLessThanOrEqual(10);
      expect(result.pageSize).toBe(10);
    });

    test("should fetch payments with specific page number", async () => {
      const result = await getPaymentsService({ page: 2, pageSize: 5 });

      expect(result.page).toBe(2);
      expect(result.pageSize).toBe(5);
    });

    test("should search payments by payment ID", async () => {
      const result = await getPaymentsService({ search: "pay_134_1" });

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
      expect(result.payments[0].id).toBe("pay_134_1");
    });

    test("should filter payments by currency", async () => {
      const result = await getPaymentsService({ currency: "USD" });

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
      result.payments.forEach((payment: any) => {
        expect(payment.currency).toBe("USD");
      });
    });

    test("should combine search and currency filters", async () => {
      const result = await getPaymentsService({
        search: "pay_134",
        currency: "USD",
      });

      expect(result.payments).toBeDefined();
      result.payments.forEach((payment: any) => {
        expect(payment.id).toContain("pay_134");
        expect(payment.currency).toBe("USD");
      });
    });

    test("should handle all parameters together", async () => {
      const result = await getPaymentsService({
        search: "pay_134",
        currency: "USD",
        page: 1,
        pageSize: 3,
      });

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeLessThanOrEqual(3);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(3);
    });
  });

  describe("Error handling", () => {
    test("should handle 404 error when payment not found", async () => {
      const result = await getPaymentsService({ search: "pay_404" });

      expect(result).toBeDefined();
      expect(result.message).toBe("Payment not found");
    });

    test("should handle 500 internal server error", async () => {
      const result = await getPaymentsService({ search: "pay_500" });

      expect(result).toBeDefined();
      expect(result.message).toBe("Internal Server Error");
    });

    test("should handle 401 unauthorized error", async () => {
      const result = await getPaymentsService({ search: "401" });

      expect(result).toBeDefined();
      expect(result.message).toBe("Unauthorized access");
    });

    test("should return 404 when no payments match filters", async () => {
      const result = await getPaymentsService({
        search: "nonexistent_payment_id_12345",
      });

      expect(result).toBeDefined();
      expect(result.message).toBe("Payment not found");
    });
  });

  describe("Query parameter construction", () => {
    test("should construct URL with search parameter", async () => {
      const searchTerm = "pay_134";
      await getPaymentsService({ search: searchTerm });

      const result = await getPaymentsService({ search: searchTerm });
      expect(result.payments).toBeDefined();
    });

    test("should construct URL with currency parameter", async () => {
      const currency = "EUR";
      const result = await getPaymentsService({ currency });

      result.payments.forEach((payment: any) => {
        expect(payment.currency).toBe(currency);
      });
    });

    test("should construct URL with pagination parameters", async () => {
      const result = await getPaymentsService({ page: 1, pageSize: 5 });

      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    test("should handle empty parameters object", async () => {
      const result = await getPaymentsService({});

      expect(result).toBeDefined();
      expect(result.payments).toBeDefined();
      expect(Array.isArray(result.payments)).toBe(true);
    });

    test("should handle undefined parameters", async () => {
      const result = await getPaymentsService(undefined);

      expect(result).toBeDefined();
      expect(result.payments).toBeDefined();
      expect(Array.isArray(result.payments)).toBe(true);
    });
  });

  describe("Response structure validation", () => {
    test("should return properly structured response", async () => {
      const result = await getPaymentsService();

      expect(result).toHaveProperty("payments");
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("pageSize");
    });

    test("should return payment objects with expected properties", async () => {
      const result = await getPaymentsService({ page: 1, pageSize: 1 });

      expect(result.payments.length).toBe(1);
      const payment = result.payments[0];

      expect(payment).toHaveProperty("id");
      expect(payment).toHaveProperty("currency");
      expect(payment).toHaveProperty("amount");
      expect(payment).toHaveProperty("date");
      expect(payment).toHaveProperty("status");
      expect(payment).toHaveProperty("customerName");
      expect(payment).toHaveProperty("customerAddress");
      expect(payment).toHaveProperty("description");
    });

    test("should return correct total count", async () => {
      const result = await getPaymentsService({ currency: "USD" });

      expect(result.total).toBeGreaterThan(0);
      expect(typeof result.total).toBe("number");
    });
  });

  describe("Edge cases", () => {
    test("should handle partial search terms", async () => {
      const result = await getPaymentsService({ search: "pay_" });

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
    });

    test("should be case-insensitive for search", async () => {
      const result = await getPaymentsService({ search: "PAY_134" });

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
    });

    test("should handle large page numbers", async () => {
      const result = await getPaymentsService({ page: 999, pageSize: 5 });

      expect(result).toBeDefined();
      expect(result.page).toBe(999);
      expect(Array.isArray(result.payments)).toBe(true);
    });

    test("should handle large page sizes", async () => {
      const result = await getPaymentsService({ page: 1, pageSize: 100 });

      expect(result).toBeDefined();
      expect(result.pageSize).toBe(100);
    });

    test("should handle zero page size gracefully", async () => {
      const result = await getPaymentsService({ page: 1, pageSize: 0 });

      expect(result).toBeDefined();
    });
  });

  describe("Integration scenarios", () => {
    test("should support multiple sequential calls", async () => {
      const result1 = await getPaymentsService({ page: 1, pageSize: 5 });
      const result2 = await getPaymentsService({ page: 2, pageSize: 5 });

      expect(result1.payments).toBeDefined();
      expect(result2.payments).toBeDefined();
      expect(result1.page).toBe(1);
      expect(result2.page).toBe(2);
    });

    test("should support filtering after initial fetch", async () => {
      const allPayments = await getPaymentsService({ page: 1, pageSize: 10 });
      const filteredPayments = await getPaymentsService({
        currency: "USD",
        page: 1,
        pageSize: 10,
      });

      expect(allPayments.total).toBeGreaterThanOrEqual(filteredPayments.total);
    });

    test("should handle rapid successive calls", async () => {
      const promises = [
        getPaymentsService({ page: 1 }),
        getPaymentsService({ page: 2 }),
        getPaymentsService({ page: 3 }),
      ];

      const results = await Promise.all(promises);

      results.forEach((result, index) => {
        expect(result).toBeDefined();
        expect(result.page).toBe(index + 1);
      });
    });
  });
});
