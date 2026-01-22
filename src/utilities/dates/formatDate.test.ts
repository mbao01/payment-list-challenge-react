import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  beforeAll(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("should format a date", () => {
    const date = new Date("2024-04-16T09:30:00Z");

    expect(formatDate(date)).toBe("16/04/2024, 09:30:00");
  });

  it("should format a date with a custom format", () => {
    const date = new Date("2022-01-01");

    expect(formatDate(date, "yyyy-MM-dd")).toBe("2022-01-01");
  });

  it("should return null if the input date is invalid", () => {
    expect(formatDate(null)).toBe(null);
    expect(formatDate(undefined)).toBe(null);
    expect(formatDate("invalid date")).toBe(null);
    expect(formatDate("2024-04-16")).toBe(null);
  });
});