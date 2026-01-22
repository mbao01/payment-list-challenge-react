import { describe, expect, it } from "vitest";
import { handleApiError } from "./handleApiError";
import { I18N } from "@/constants/i18n";
import { StatusCodes } from "http-status-codes";

describe("handleApiError", () => {
  it("should handle 404 Response and return custom message", async () => {
    const mockResponse = new Response(
      JSON.stringify({ message: "Not found" }),
      {
        status: StatusCodes.NOT_FOUND,
        headers: { "Content-Type": "application/json" },
      },
    );

    const result = await handleApiError(mockResponse);

    expect(result).toEqual({
      message: I18N.PAYMENT_NOT_FOUND,
    });
  });

  it("should handle 500 Response and return error message from response", async () => {
    const errorMessage = "Internal Server Error";
    const mockResponse = new Response(
      JSON.stringify({ message: errorMessage }),
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        headers: { "Content-Type": "application/json" },
      },
    );

    const result = await handleApiError(mockResponse);

    expect(result).toEqual({
      message: errorMessage,
    });
  });

  it("should handle Response with no JSON body", async () => {
    const mockResponse = new Response("", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      headers: { "Content-Type": "text/plain" },
    });

    const result = await handleApiError(mockResponse);

    expect(result).toEqual({
      message: "An unexpected error occurred",
    });
  });

  it("should handle unknown error types", async () => {
    const result = await handleApiError("some random error");

    expect(result).toEqual({
      message: "An unexpected error occurred",
    });
  });
});
