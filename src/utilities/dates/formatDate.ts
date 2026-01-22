import { format } from "date-fns/format";
import { isValid } from "date-fns/isValid";

export const formatDate = (
  date: Date | string | null | undefined,
  dateFormat = "dd/MM/yyyy, HH:mm:ss",
) => {
  if (!(date && isValid(new Date(date)))) return null;

  return format(new Date(date), dateFormat);
};
