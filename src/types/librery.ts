import { HostedPaymentRequest } from "./hosted";
import { CreatePaymentLinkPayload, PaymentLinkResponse, PaymentTemplateResponse } from "./payment-link";
import { PaymentPayload } from "./s2s";

export interface S2SInput extends PaymentPayload {}
export interface S2SOutput extends PaymentResponse{}
export interface HostedInput extends HostedPaymentRequest {}
export interface HostedOutput extends PaymentResponse {}
export interface APMInput extends HostedPaymentRequest {}
export interface APMOutput extends PaymentResponse {}
export interface PaymentLinkCreateInput extends CreatePaymentLinkPayload {}
export interface PaymentLinkCreateOutput extends PaymentLinkResponse {}
export interface PaymentTemplateGetOutput extends PaymentTemplateResponse {}