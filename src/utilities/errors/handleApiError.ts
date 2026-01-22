import { I18N } from "@/constants/i18n";
import { ApiError } from "@/types/error";
import { StatusCodes } from "http-status-codes";

const ERROR_MESSAGE = {
  [StatusCodes.NOT_FOUND]: I18N.PAYMENT_NOT_FOUND,
  [StatusCodes.INTERNAL_SERVER_ERROR]: I18N.INTERNAL_SERVER_ERROR,
} satisfies Partial<Record<StatusCodes, string>>;

export const handleApiError = async (error: unknown): Promise<ApiError> => {
  try {
    if (error instanceof Response) {
      const data = await error.json();
      const message =
        ERROR_MESSAGE[error.status as keyof typeof ERROR_MESSAGE] ||
        data.message;

      return { message };
    }

    throw error;
  } catch (error) {
    return {
      message: I18N.SOMETHING_WENT_WRONG,
    };
  }
};
