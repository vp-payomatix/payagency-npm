export interface PayoutPayload {
  wallet_id: string;
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
  webhook_url?: string;
  order_id?: string;
}

export interface CustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
}

export interface TransactionData {
  amount: number;
  currency: string;
  order_id: string | null;
  transaction_id: string;
  customer: CustomerInfo;
}

export interface PayoutResponse {
  status: "SUCCESS" | "BLOCKED" | "PENDING";
  message: string;
  data: TransactionData;
  redirect_url?: string;
}

export interface WalletInfo {
  wallet_id: string;
  currency: string;
  amount: number;
  payment_method: string;
  status: "Active" | "Inactive" | string;
}

export interface WalletsResponse {
  data: WalletInfo[];
}


export interface EstimatePayoutPayload{
    wallet_id: string;
    amount: number;
    card_number: string;
}

export interface EstimatePayout{
    amount_requried: number;
    wallet_balance: number;
    total_fee: number;
}

export interface EstimatePayoutResponse{
    data: EstimatePayout;
}



export interface PayoutStatusResponse {
  status: "SUCCESS" | "PENDING" | "FAILED";
  message: string;
  data: TransactionData;
}