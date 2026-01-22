import type { Mock } from "vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchParams } from "./useSearchParams";

describe("useSearchParams", () => {
  let originalLocation: Location;
  let originalHistory: History;

  beforeEach(() => {
    originalLocation = window.location;
    originalHistory = window.history;

    delete (window as any).location;
    // ,ock window.location
    (window.location as Location) = {
      ...originalLocation,
      search: "",
      pathname: "/test",
    } as Location;

    // mock window.history
    window.history.pushState = vi.fn();
  });

  afterEach(() => {
    // restore original location and history
    (window.location as Location) = originalLocation;
    window.history = originalHistory;
  });

  it("should initialize with empty URLSearchParams when no query string", () => {
    const { result } = renderHook(() => useSearchParams());
    const [searchParams] = result.current;

    expect(searchParams.toString()).toBe("");
  });

  it("should initialize with URLSearchParams from window.location.search", () => {
    window.location.search = "?page=1&currency=USD";

    const { result } = renderHook(() => useSearchParams());
    const [searchParams] = result.current;

    expect(searchParams.get("page")).toBe("1");
    expect(searchParams.get("currency")).toBe("USD");
  });

  it("should update search params with object", () => {
    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams({ page: 1, currency: "EUR" });
    });

    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      "",
      "?page=1&currency=EUR",
    );
  });

  it("should remove params when value is null", () => {
    window.location.search = "?page=1&currency=USD";

    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams({ currency: null });
    });

    const calledUrl = (window.history.pushState as Mock).mock.calls[0][2];
    expect(calledUrl).toBe("?page=1");
  });

  it("should remove params when value is undefined", () => {
    window.location.search = "?page=1&currency=USD";

    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams({ currency: undefined });
    });

    const calledUrl = (window.history.pushState as Mock).mock.calls[0][2];
    expect(calledUrl).toBe("?page=1");
  });

  it("should remove params when value is empty string", () => {
    window.location.search = "?page=1&currency=USD";

    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams({ currency: "" });
    });

    const calledUrl = (window.history.pushState as Mock).mock.calls[0][2];
    expect(calledUrl).toBe("?page=1");
  });

  it("should convert number values to string", () => {
    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams({ page: 5 });
    });

    expect(window.history.pushState).toHaveBeenCalledWith({}, "", "?page=5");
  });

  it("should support functional updates", () => {
    window.location.search = "?page=1";

    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams((params) => {
        params.set("currency", "GBP");
        return params;
      });
    });

    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      "",
      "?page=1&currency=GBP",
    );
  });

  it("should update state when functional update returns URLSearchParams", () => {
    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams((params) => {
        params.set("test", "value");
        return params;
      });
    });

    const [searchParams] = result.current;
    expect(searchParams.get("test")).toBe("value");
  });

  it("should clear all params when updated with empty object and pathname only", () => {
    window.location.search = "?page=1&currency=USD";
    window.location.pathname = "/payments";

    const { result } = renderHook(() => useSearchParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams({ page: "", currency: "" });
    });

    const calledUrl = (window.history.pushState as Mock).mock.calls[0][2];
    expect(calledUrl).toBe("/payments");
  });

  it("should handle popstate events", () => {
    const { result } = renderHook(() => useSearchParams());

    // Simulate browser back/forward navigation
    act(() => {
      window.location.search = "?page=2";
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    const [searchParams] = result.current;
    expect(searchParams.get("page")).toBe("2");
  });

  it("should clean up popstate listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useSearchParams());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "popstate",
      expect.any(Function),
    );
  });
});
