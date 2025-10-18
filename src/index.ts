import {
  ApiClient,
  ApiClientInstance,
  ApiClientOptions,
} from "./lib/api-client";
import {
  RefundPayload,
} from "./types/payout";
import Payout from "./apis/payout";
import Status from "./apis/status";
import Refund from "./apis/refund";
import PaymentLink from "./apis/payment-link";
import TXN from "./apis/txn";
import Crypto from "./apis/crypto";
import Payment from "./apis/payment";

class PayAgencyApi {
  private client: ApiClient;
  private payoutInstance: Payout;
  private paymentInstance: Payment;
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
    const client = new ApiClient(apiClientOptions);
    this.client = client;
    this.paymentInstance = this.createApi(Payment);
    this.payoutInstance = this.createApi(Payout);
    this.statusInstance = this.createApi(Status);
    this.refundInstance = this.createApi(Refund);
    this.paymentLinkInstance = this.createApi(PaymentLink);
    this.txnInstance = this.createApi(TXN);
    this.cryptoInstance = this.createApi(Crypto);
  }

  get Payment() {
    return this.paymentInstance;
  }

  get Payout() {
    return this.payoutInstance;
  }

  get PaymentLink() {
    return this.paymentLinkInstance;
  }

  get TXN() {
    return this.txnInstance;
  }

  async status(id: string) {
    return this.statusInstance.status(id);
  }

  async refund(data: RefundPayload) {
    return this.refundInstance.create(data);
  }

  get Crypto() {
    return this.cryptoInstance;
  }
}

export default PayAgencyApi;

export type { ApiClientOptions, ApiClientInstance };
export * from "./types/librery";
