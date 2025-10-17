export interface HostedPaymentRequest {
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
  redirect_url: string;
  webhook_url?: string;
  order_id?: string;
  terminal_id?: string;
}

