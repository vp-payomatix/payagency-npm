import {
  ApiClient,
  PayAgencyInstance,
  PayAgencyClientOptions,
} from "./lib/api-client";
import Payout from "./apis/payout";
import Refund from "./apis/refund";
import PaymentLink from "./apis/payment-link";
import TXN from "./apis/txn";
import Crypto from "./apis/crypto";
import Payment from "./apis/payment";
import { RefundInput } from "./types/librery";

class PayAgencyApi {
  private client: ApiClient;
  private payoutInstance: Payout;
  private paymentInstance: Payment;
  private refundInstance: Refund;
  private paymentLinkInstance: PaymentLink;
  private txnInstance: TXN;
  private cryptoInstance: Crypto;
  private createApi<T>(
    ApiClass: new (
      instance: PayAgencyInstance,
      environment?: ApiClient["environment"]
    ) => T
  ): T {
    return new ApiClass(this.client.instance, this.client.environment);
  }

  constructor(apiClientOptions: PayAgencyClientOptions) {
    const client = new ApiClient(apiClientOptions);
    this.client = client;
    this.paymentInstance = this.createApi(Payment);
    this.payoutInstance = this.createApi(Payout);
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

  async refund(data: RefundInput) {
    return this.refundInstance.create(data);
  }

  get Crypto() {
    return this.cryptoInstance;
  }
}

export default PayAgencyApi;

export type { PayAgencyClientOptions, PayAgencyInstance };
export * from "./types/librery";

if (typeof module !== "undefined" && module.exports) {
  (module.exports as any) = PayAgencyApi;
  (module.exports as any).default = PayAgencyApi;
}