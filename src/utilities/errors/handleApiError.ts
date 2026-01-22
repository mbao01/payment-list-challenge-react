import { I18N } from "@/constants/i18n";
import { ApiError } from "@/types/error";
import { StatusCodes } from "http-status-codes";

export const handleApiError = async (error: unknown): Promise<ApiError> => {
  try {
    if (error instanceof Response) {
      const data = await error.json();
      const message =
        error.status === StatusCodes.NOT_FOUND
          ? I18N.PAYMENT_NOT_FOUND
          : data.message;

      return { message };
    }

    throw error;
  } catch (error) {
    return {
      message: "An unexpected error occurred",
    };
  }
};
