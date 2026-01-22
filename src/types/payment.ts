import type { ISODateString } from "./date";

export type PaymentFilter = {
  search: string;
  currency: string;
  page: number;
  pageSize: number;
};

type PaymentCurrency =
  | "AUD"
  | "CAD"
  | "CZK"
  | "EUR"
  | "GBP"
  | "JPY"
  | "USD"
  | "ZAR";

type PaymentStatus = "completed" | "pending" | "failed" | "refunded";

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  customerAddress: string;
  currency: PaymentCurrency;
  status: PaymentStatus;
  date: ISODateString;
  description: string;
}

export interface PaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}
