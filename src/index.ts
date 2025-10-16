import {
  ApiClient,
  ApiClientInstance,
  ApiClientOptions,
} from "./lib/api-client";
import S2SPayment from "./apis/s2s";
import type { PaymentPayload } from "./dts/s2s.dts";
import HostedPayment from "./apis/hosted";
import { HostedPaymentRequest } from "./dts/hosted.dts";
import ApmPayment from "./apis/apm";
import { EstimatePayoutPayload, PayoutPayload } from "./dts/payout.dts";
import Payout from "./apis/payout";

class PayAgencyApi {
  private client: ApiClient;
  private apiClient: ApiClientInstance;
  private env: "test" | "live" = "test";

  constructor(apiClientOptions: ApiClientOptions) {
    this.client = new ApiClient(apiClientOptions);
    this.apiClient = this.client.instance;
    this.env = this.client.environment;
  }

  async s2s(payload: PaymentPayload) {
    const instance = new S2SPayment(this.apiClient, this.env);
    return await instance.createPayment(payload);
  }

  async hosted(payload: HostedPaymentRequest) {
    const instance = new HostedPayment(this.apiClient, this.env);
    return await instance.createPayment(payload);
  }

  async apm(payload: HostedPaymentRequest) {
    const instance = new ApmPayment(this.apiClient, this.env);
    return await instance.createPayment(payload);
  }

  async payout(payload: PayoutPayload) {
    const instance = new Payout(this.apiClient, this.env);
    return await instance.createPayment(payload);
  }

  get wallets() {
    const instance = new Payout(this.apiClient, this.env);
    return instance.getWallets();
  }

  async payoutFee(payload: EstimatePayoutPayload) {
    const instance = new Payout(this.apiClient, this.env);
    return await instance.esitimatePayoutFee(payload);
  }

  async payoutStatus(reference_id: string) {
    const instance = new Payout(this.apiClient, this.env);
    return instance.getPayoutStatus(reference_id);
  }
}

export default PayAgencyApi;

export type { ApiClientOptions, ApiClientInstance };
