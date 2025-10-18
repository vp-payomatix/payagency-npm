interface CryptoPaymentLinkBase {
  payment_template_id: string;
  order_id?: string;
  terminal_id?: string;
  expiry_date?: string;
}

export interface OnrampLinkPayload extends CryptoPaymentLinkBase {
  transaction_type: "ONRAMP";
  fiat_amount: number;
  fiat_currency: string;
  crypto_currency: string;
  crypto_amount?: never;
}

export interface OfframpLinkPayload extends CryptoPaymentLinkBase {
  transaction_type: "OFFRAMP";
  crypto_amount: string;
  crypto_currency: string;
  fiat_amount?: never;
  fiat_currency: string;
}

export interface PayinLinkPayload extends CryptoPaymentLinkBase {
  transaction_type: "PAYIN";
  fiat_amount: number;
  fiat_currency: string;
  crypto_currency: string;
  crypto_amount?: never;
}
export type CryptoPaymentLinkPayload =
  | OnrampLinkPayload
  | OfframpLinkPayload
  | PayinLinkPayload;

export interface OnRampOffRampBasePayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  fiat_currency: string;
  crypto_currency: string;
  wallet_address: string;
  ip_address: string;
  email: string;
  country: string;
  crypto_network: string;
  redirect_url: string;
  webhook_url?: string;
  order_id?: string;
  terminal_id?: string;
}

export interface OnRampPayload extends OnRampOffRampBasePayload {
  transaction_type: "ONRAMP";
  fiat_amount: number;
  crypto_amount?: never;
}

export interface OffRampPayload extends OnRampOffRampBasePayload {
  transaction_type: "OFFRAMP";
  crypto_amount: string;
  fiat_amount?: never;
}

export type CryptoOnRampOffRampPayload = OnRampPayload | OffRampPayload;

export interface CryptoOnRampOffRampResponse {
  status: "REDIRECT" | "PENDING" | "FAILED";
  message: string;
  redirect_url?: string;
  data: {
    transaction_id: string;
    fiat: string;
    fiat_amount: number;
    crypto: string;
    crypto_amount: number;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

export interface CryptoExchangeCurrenciesPayload {
  country: string & { __brand?: "ISO3166-1-alpha-2" };
  amount: number;
}

export interface CryptoExchangeCurrenciesResponse {
  message: string;
  data: {
    name: string;
    code: string;
    symbol: string;
  }[];
}

export interface CryptoPayinPayload {
  first_name: string;
  last_name: string;
  email: string;
  amount: number;
  currency: string;
  crypto_currency: string;
  ip_address: string;
  phone_number: string;
  address: string;
  country: string;
  crypto_network: string;
  order_id?: string;
  redirect_url: string;
  webhook_url?: string;
  terminal_id?: string;
}

export interface CryptoPayinResponse {
  status: "SUCCESS" | "PENDING" | "FAILED";
  message: string;
  redirect_url?: string;
  data: {
    amount: number;
    currency: string;
    order_id: string | null;
    transaction_id: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
    crypto_currency: string;
  };
}
