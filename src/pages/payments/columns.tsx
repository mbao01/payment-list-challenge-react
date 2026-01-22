import { createColumnHelper } from "@tanstack/react-table";
import type { Payment } from "@/types/payment";
import { StatusBadge } from "@/components/ui";
import { formatDate } from "@/utilities/dates";
import { I18N } from "@/constants/i18n";

const paymentColumnHelper = createColumnHelper<Payment>();

export const getpaymentsColumn = () => [
  paymentColumnHelper.accessor("id", {
    header: I18N.TABLE_HEADER_PAYMENT_ID,
    cell: (info) => {
      const paymentId = info.getValue();
      return paymentId;
    },
  }),
  paymentColumnHelper.accessor("date", {
    header: I18N.TABLE_HEADER_DATE,
    cell: (info) => {
      const date = info.getValue();
      return formatDate(date);
    },
  }),
  paymentColumnHelper.accessor("amount", {
    header: I18N.TABLE_HEADER_AMOUNT,
    cell: (info) => {
      const amount = info.getValue();
      return amount;
    },
  }),
  paymentColumnHelper.accessor("customerName", {
    header: I18N.TABLE_HEADER_CUSTOMER,
    cell: (info) => {
      const customerName = info.getValue();
      return customerName;
    },
  }),
  paymentColumnHelper.accessor("currency", {
    header: I18N.TABLE_HEADER_CURRENCY,
    cell: (info) => {
      const currency = info.getValue();
      return currency;
    },
  }),
  paymentColumnHelper.accessor("status", {
    header: I18N.TABLE_HEADER_STATUS,
    cell: (info) => {
      const status = info.getValue();
      return <StatusBadge status={status}>{status}</StatusBadge>;
    },
  }),
];

export const PAYMENTS_COLUMNS = getpaymentsColumn();
