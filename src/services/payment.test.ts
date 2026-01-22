import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "@/mocks/node";
import { getPaymentsService } from "./payment";
import { PaymentsResponse } from "@/types/payment";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("getPaymentsService", () => {
  describe("Successful API calls", () => {
    it("should fetch payments without parameters", async () => {
      const result = (await getPaymentsService()) as PaymentsResponse;

      expect(result.payments).toBeDefined();
      expect(Array.isArray(result.payments)).toBe(true);
      expect(result.payments.length).toBeGreaterThan(0);
      expect(result.total).toBeDefined();
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    it("should fetch payments with default pagination (page=1, pageSize=5)", async () => {
      const result = (await getPaymentsService({
        page: 1,
        pageSize: 5,
      })) as PaymentsResponse;

      expect(result.payments).toHaveLength(5);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    it("should fetch payments with custom page size", async () => {
      const result = (await getPaymentsService({
        page: 1,
        pageSize: 10,
      })) as PaymentsResponse;

      expect(result.payments.length).toBeLessThanOrEqual(10);
      expect(result.pageSize).toBe(10);
    });

    it("should fetch payments with specific page number", async () => {
      const result = (await getPaymentsService({
        page: 2,
        pageSize: 5,
      })) as PaymentsResponse;

      expect(result.page).toBe(2);
      expect(result.pageSize).toBe(5);
    });

    it("should search payments by payment ID", async () => {
      const result = (await getPaymentsService({
        search: "pay_134_1",
      })) as PaymentsResponse;

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
      expect(result.payments[0].id).toBe("pay_134_1");
    });

    it("should filter payments by currency", async () => {
      const result = (await getPaymentsService({
        search: "",
        currency: "USD",
      })) as PaymentsResponse;

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
      result.payments.forEach((payment: any) => {
        expect(payment.currency).toBe("USD");
      });
    });

    it("should combine search and currency filters", async () => {
      const result = (await getPaymentsService({
        search: "pay_134",
        currency: "USD",
      })) as PaymentsResponse;

      expect(result.payments).toBeDefined();
      result.payments.forEach((payment: any) => {
        expect(payment.id).toContain("pay_134");
        expect(payment.currency).toBe("USD");
      });
    });

    it("should handle all parameters together", async () => {
      const result = (await getPaymentsService({
        search: "pay_134",
        currency: "USD",
        page: 1,
        pageSize: 3,
      })) as PaymentsResponse;

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeLessThanOrEqual(3);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(3);
    });
  });

  describe("Error handling", () => {
    it("should handle 404 error when payment not found", async () => {
      const result = (await getPaymentsService({ search: "pay_404" })) as {
        error: { message: string };
      };

      expect(result).toBeDefined();
      expect(result.error.message).toBe("Payment not found.");
    });
  });

  describe("Query parameter construction", () => {
    it("should construct URL with search parameter", async () => {
      const searchTerm = "pay_134";
      await getPaymentsService({ search: searchTerm });

      const result = (await getPaymentsService({
        search: searchTerm,
      })) as PaymentsResponse;
      expect(result.payments).toBeDefined();
    });

    it("should construct URL with currency parameter", async () => {
      const currency = "EUR";
      const result = (await getPaymentsService({
        currency,
      })) as PaymentsResponse;

      result.payments.forEach((payment: any) => {
        expect(payment.currency).toBe(currency);
      });
    });

    it("should construct URL with pagination parameters", async () => {
      const result = (await getPaymentsService({
        page: 1,
        pageSize: 5,
      })) as PaymentsResponse;
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    it("should handle empty parameters object", async () => {
      const result = (await getPaymentsService({})) as PaymentsResponse;

      expect(result).toBeDefined();
      expect(result.payments).toBeDefined();
      expect(Array.isArray(result.payments)).toBe(true);
    });

    it("should handle undefined parameters", async () => {
      const result = (await getPaymentsService(undefined)) as PaymentsResponse;

      expect(result).toBeDefined();
      expect(result.payments).toBeDefined();
      expect(Array.isArray(result.payments)).toBe(true);
    });
  });

  describe("Response structure validation", () => {
    it("should return properly structured response", async () => {
      const result = (await getPaymentsService()) as PaymentsResponse;

      expect(result).toHaveProperty("payments");
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("pageSize");
    });

    it("should return payment objects with expected properties", async () => {
      const result = (await getPaymentsService({
        page: 1,
        pageSize: 1,
      })) as PaymentsResponse;

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

    it("should return correct total count", async () => {
      const result = (await getPaymentsService({
        currency: "USD",
      })) as PaymentsResponse;

      expect(result.total).toBeGreaterThan(0);
      expect(typeof result.total).toBe("number");
    });
  });

  describe("Edge cases", () => {
    it("should handle partial search terms", async () => {
      const result = (await getPaymentsService({
        search: "pay_",
      })) as PaymentsResponse;

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
    });

    it("should be case-insensitive for search", async () => {
      const result = (await getPaymentsService({
        search: "PAY_134",
      })) as PaymentsResponse;

      expect(result.payments).toBeDefined();
      expect(result.payments.length).toBeGreaterThan(0);
    });

    it("should handle large page numbers", async () => {
      const result = (await getPaymentsService({
        page: 999,
        pageSize: 5,
      })) as PaymentsResponse;

      expect(result).toBeDefined();
      expect(result.page).toBe(999);
      expect(Array.isArray(result.payments)).toBe(true);
    });

    it("should handle large page sizes", async () => {
      const result = (await getPaymentsService({
        page: 1,
        pageSize: 100,
      })) as PaymentsResponse;

      expect(result).toBeDefined();
      expect(result.pageSize).toBe(100);
    });

    it("should handle zero page size gracefully", async () => {
      const result = (await getPaymentsService({
        page: 1,
        pageSize: 0,
      })) as PaymentsResponse;

      expect(result).toBeDefined();
    });
  });
});
