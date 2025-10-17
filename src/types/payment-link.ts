
export interface PaymentTemplate {
  template_id: string;
  template_name: string;
  payment_template_id: string;
  template_screenshot: string;
  redirect_url: string;
  webhook_url: string;
}

export interface PaymentTemplateResponse {
  data: PaymentTemplate[];
}

export interface CreatePaymentLinkPayload {
    payment_template_id: string;
    amount?: number;
    currency?: string;
    expiry_date?: string;
    terminal_id?: string;
    order_id?: string;
}


export interface PaymentLinkResponse {
    message: string;
    data: string
}