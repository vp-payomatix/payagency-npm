import {
  ApiClient,
  ApiClientInstance,
  ApiClientOptions,
} from "./lib/api-client";
import S2SPayment from "./apis/s2s";
import type { PaymentPayload } from "./types/s2s";
import HostedPayment from "./apis/hosted";
import { HostedPaymentRequest } from "./types/hosted";
import ApmPayment from "./apis/apm";
import {
  EstimatePayoutPayload,
  PayoutPayload,
  RefundPayload,
} from "./types/payout";
import Payout from "./apis/payout";
import Status from "./apis/status";
import Refund from "./apis/refund";
import PaymentLink from "./apis/payment-link";
import { CreatePaymentLinkPayload } from "./types/payment-link";
import TXN from "./apis/txn";
import { TransactionParams } from "./types/txn";
import Crypto from "./apis/crypto";

class PayAgencyApi {
  private client: ApiClient;
  private s2sInstance: S2SPayment;
  private hostedInstance: HostedPayment;
  private payoutInstance: Payout;
  private apmInstance: ApmPayment;
  private statusInstance: Status;
  private refundInstance: Refund;
  private paymentLinkInstance: PaymentLink;
  private txnInstance: TXN;
  private cryptoInstance: Crypto;
  private createApi<T>(
    ApiClass: new (
      instance: ApiClientInstance,
      environment?: ApiClient["environment"]
    ) => T
  ): T {
    return new ApiClass(this.client.instance, this.client.environment);
  }

  constructor(apiClientOptions: ApiClientOptions) {
    this.client = new ApiClient(apiClientOptions);
    this.s2sInstance = this.createApi(S2SPayment);
    this.hostedInstance = this.createApi(HostedPayment);
    this.payoutInstance = this.createApi(Payout);
    this.apmInstance = this.createApi(ApmPayment);
    this.statusInstance = this.createApi(Status);
    this.refundInstance = this.createApi(Refund);
    this.paymentLinkInstance = this.createApi(PaymentLink);
    this.txnInstance = this.createApi(TXN);
    this.cryptoInstance = this.createApi(Crypto);
  }

  async s2s(payload: PaymentPayload) {
    return await this.s2sInstance.createPayment(payload);
  }

  async hosted(payload: HostedPaymentRequest) {
    return await this.hostedInstance.createPayment(payload);
  }

  async apm(payload: HostedPaymentRequest) {
    return await this.apmInstance.createPayment(payload);
  }

  async payout(payload: PayoutPayload) {
    return await this.payoutInstance.createPayment(payload);
  }

  get wallets() {
    return this.payoutInstance.getWallets();
  }

  async payoutFee(payload: EstimatePayoutPayload) {
    return await this.payoutInstance.esitimatePayoutFee(payload);
  }

  async payoutStatus(reference_id: string) {
    return this.payoutInstance.getPayoutStatus(reference_id);
  }

  async status(id: string) {
    return this.statusInstance.status(id);
  }

  async refund(data: RefundPayload) {
    return this.refundInstance.create(data);
  }

  async createPaymentLink(data: CreatePaymentLinkPayload) {
    return this.paymentLinkInstance.createPaymentLink(data);
  }

  get paymentLinkTemplates() {
    return this.paymentLinkInstance.getTemplates();
  }

  async transactions(params: TransactionParams = {}) {
    return this.txnInstance.getTransaction(params);
  }

  async payoutTransactions(params: TransactionParams = {}) {
    return this.txnInstance.getPayoutTransaction(params);
  }

  get crypto() {
    return this.cryptoInstance;
  }
}

export default PayAgencyApi;

export type { ApiClientOptions, ApiClientInstance };
