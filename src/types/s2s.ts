export interface PaymentPayload {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  ip_address: string;
  phone_number: string;
  amount: number;
  currency: string;
  card_number: string;
  card_expiry_month: string;
  card_expiry_year: string;
  card_cvv: string;
  redirect_url: string;
  webhook_url?: string;
  order_id?: string;
  terminal_id?: string;
}


export type PaymentStatus = "SUCCESS" | "REDIRECT" | "FAILED";

export interface Customer {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Refund {
  status: boolean;
  refund_date: string | null;
}

export interface Chargeback {
  status: boolean;
  chargeback_date: string | null;
}

export interface PaymentData {
  amount: number;
  currency: string;
  order_id: string | null;
  transaction_id: string;
  customer: Customer;
  refund: Refund;
  chargeback: Chargeback;
}

export interface SuccessPaymentResponse {
  status: "SUCCESS";
  message: string;
  data: PaymentData;
  redirect_url?: string;
}

export interface RedirectPaymentResponse {
  status: "REDIRECT";
  message: string;
  redirect_url: string;
  data: PaymentData;
}

export interface FailedPaymentResponse {
  status: "FAILED";
  message: string;
  data: PaymentData;
  redirect_url?: string;
}

/**
 * Union type representing all possible payment responses
 */
export type PaymentResponse =
   SuccessPaymentResponse
  | RedirectPaymentResponse
  | FailedPaymentResponse;
