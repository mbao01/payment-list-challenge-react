type FormatNumberValue = number | string | undefined | null;
type FormatNumberOptions = Partial<{ divisor: number }> &
  Pick<
    Intl.NumberFormatOptions,
    | "notation"
    | "currency"
    | "style"
    | "minimumFractionDigits"
    | "maximumFractionDigits"
  >;

export type FormatNumberFn = (
  value: FormatNumberValue,
  options?: FormatNumberOptions,
) => string | null;
