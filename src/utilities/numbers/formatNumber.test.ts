import { describe, it, expect } from "vitest";
import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  describe("Basic number formatting", () => {
    it("should format small numbers without compact notation", () => {
      expect(formatNumber(10)).toBe("10");
      expect(formatNumber(100)).toBe("100");
      expect(formatNumber(999)).toBe("999");
    });

    it("should format decimal numbers", () => {
      expect(formatNumber(123.45)).toBe("123.45");
      expect(formatNumber(1234.56)).toBe("1,234.56");
    });
  });

  describe("Null and undefined handling", () => {
    it("should return null for null value", () => {
      expect(formatNumber(null)).toBe(null);
    });

    it("should return null for undefined value", () => {
      expect(formatNumber(undefined)).toBe(null);
    });

    it("should return null for empty string", () => {
      expect(formatNumber("")).toBe(null);
    });
  });

  describe("Fraction digits options", () => {
    it("should respect minimumFractionDigits", () => {
      expect(
        formatNumber(10.12712, {
          notation: "standard",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      ).toBe("10.13");
    });

    it("should respect maximumFractionDigits", () => {
      expect(
        formatNumber(10.12345, {
          notation: "standard",
          maximumFractionDigits: 2,
        }),
      ).toBe("10.12");
    });

    it("should combine min and max fraction digits", () => {
      expect(
        formatNumber(10.5, {
          notation: "standard",
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        }),
      ).toBe("10.50");
    });
  });

  it("should format zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("should format negative numbers", () => {
    expect(formatNumber(-1000)).toBe("-1,000");
    expect(formatNumber(-1500000)).toBe("-1,500,000");
  });

  it("should format very large numbers", () => {
    expect(formatNumber(1000000000)).toBe("1,000,000,000");
    expect(formatNumber(1500000000000)).toBe("1,500,000,000,000");
  });

  it("should format very small numbers", () => {
    expect(formatNumber(0.01)).toBe("0.01");
    expect(formatNumber(0.001)).toBe("0.001");
  });
});
