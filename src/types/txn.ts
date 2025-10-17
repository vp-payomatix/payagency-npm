import { PaginationMeta } from "./common";

export interface TransactionParams {
  transaction_start_date?: string;
  transaction_end_date?: string;
  nextCursor?: string;
  prevCursor?: string;
}

export interface Transaction {
  first_name: string;
  last_name: string;
  converted_amount: string;
  converted_currency: string;
  transaction_id: string;
  amount: string;
  currency: string;
  status: string;
  card_type: string | null;
  card_number: string | null;
  transaction_type: string;
  order_id: string | null;
  country: string;
  email: string;
  created_at: string;
  transaction_date: string;
  chargeback_date: string | null;
  refund_date: string | null;
  suspicious_date: string | null;
  merchant_connector: {
    name: string;
  };
  user: {
    name: string;
    user_kyc: {
      name: string;
    };
  };
}

export interface TransactionsResponse {
  message: string;
  data: Transaction[];
  meta: PaginationMeta;
}
