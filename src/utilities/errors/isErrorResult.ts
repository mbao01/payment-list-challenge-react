export const isErrorResult = (
  result: any,
): result is { error: { message: string } } => {
  return "error" in result;
};
