import {
  CryptoExchangeCurrenciesPayload,
  CryptoExchangeCurrenciesResponse,
  CryptoOnRampOffRampPayload,
  CryptoOnRampOffRampResponse,
  CryptoPayinPayload,
  CryptoPayinResponse,
  CryptoPaymentLinkPayload,
  OfframpLinkPayload,
  OffRampPayload,
  OnrampLinkPayload,
  OnRampPayload,
  PayinLinkPayload,
} from "./crypto";
import { HostedPaymentRequest } from "./hosted";
import {
  CreatePaymentLinkPayload,
  PaymentLinkResponse,
  PaymentTemplateResponse,
} from "./payment-link";
import {
  EstimatePayoutPayload,
  EstimatePayoutResponse,
  PaymentStatusResponse,
  PayoutPayload,
  PayoutResponse,
  PayoutStatusResponse,
  RefundPayload,
  RefundResponse,
  WalletsResponse,
} from "./payout";
import { PaymentPayload } from "./s2s";
import { TransactionParams, TransactionsResponse } from "./txn";

// payment
export interface S2SInput extends PaymentPayload {}
export interface S2SOutput extends PaymentResponse {}
export interface HostedInput extends HostedPaymentRequest {}
export interface HostedOutput extends PaymentResponse {}
export interface APMInput extends HostedPaymentRequest {}
export interface APMOutput extends PaymentResponse {}

// payment link
export interface PaymentLinkCreateInput extends CreatePaymentLinkPayload {}
export interface PaymentLinkCreateOutput extends PaymentLinkResponse {}
export interface PaymentTemplatesOutput extends PaymentTemplateResponse {}

// payout
export interface PayoutInput extends PayoutPayload {}
export interface PayoutOutput extends PayoutResponse {}
export interface WalletsOutput extends WalletsResponse {}
export interface EstimateFeeInput extends EstimatePayoutPayload {}
export interface EstimateFeeOutput extends EstimatePayoutResponse {}
export interface PayoutStatusOutput extends PayoutStatusResponse {}

// crypto
export type CryptoPaymentInput = CryptoOnRampOffRampPayload;
export interface CryptoPaymentOutput extends CryptoOnRampOffRampResponse {}
export type CryptoPaymentLinkInput = CryptoPaymentLinkPayload;
export interface CryptoPaymentLinkOutput extends PaymentLinkResponse {}
export interface CryptoPayinInput extends CryptoPayinPayload {}
export interface CryptoPayinOutput extends CryptoPayinResponse {}
export interface CryptoCurrenciesInput
  extends CryptoExchangeCurrenciesPayload {}
export interface CryptoCurrenciesOutput
  extends CryptoExchangeCurrenciesResponse {}
export interface CryptoOffRampInput
  extends Omit<OffRampPayload, "transaction_type"> {}
export interface CryptoOnRampInput
  extends Omit<OnRampPayload, "transaction_type"> {}
export interface CryptoPayinLinkInput
  extends Omit<PayinLinkPayload, "transaction_type"> {}
export interface CryptoOffRampLinkInput
  extends Omit<OfframpLinkPayload, "transaction_type"> {}
export interface CryptoOnRampLinkInput
  extends Omit<OnrampLinkPayload, "transaction_type"> {}

//refund
export interface RefundInput extends RefundPayload {}
export interface RefundOutput extends RefundResponse {}

// txn
export interface TransactionsInput extends TransactionParams {}
export interface TransactionsOutput extends TransactionsResponse {}
export interface PaymentStatusOutput extends PaymentStatusResponse {}
