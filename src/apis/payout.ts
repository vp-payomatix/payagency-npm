import { AxiosError } from "axios";
import { ApiClientInstance } from "../lib/api-client";
import {
  EstimatePayoutPayload,
  EstimatePayoutResponse,
  PayoutPayload,
  PayoutResponse,
  PayoutStatusResponse,
  WalletsResponse,
} from "../types/payout";
import { testEstimatePayoutResponse, testWallets } from "../lib/dummy-response";

class Payout {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async payout(data: PayoutPayload): Promise<PayoutResponse> {
    try {
      const endpoints = {
        test: "/api/v1/test/payout",
        live: "/api/v1/live/payout",
      };
      const response = await this.apiClient.post<PayoutResponse>(
        endpoints[this.env],
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating payment:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  get wallets() {
    return this.get_wallets();
  }

  async get_wallets(): Promise<WalletsResponse> {
    try {
      const endpoints = {
        test: "/api/v1/wallet",
        live: "/api/v1/wallet",
      };
      if (this.env === "test") {
        return {
          data: testWallets,
        };
      }
      const response = await this.apiClient.get<WalletsResponse>(
        endpoints[this.env]
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching wallets:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  async esitimate_fee(
    payload: EstimatePayoutPayload
  ): Promise<EstimatePayoutResponse> {
    try {
      const endpoints = {
        test: "/api/v1/wallet/estimate-payout",
        live: "/api/v1/wallet/estimate-payout",
      };
      if (this.env === "test") {
        return testEstimatePayoutResponse;
      }
      const response = await this.apiClient.post<EstimatePayoutResponse>(
        endpoints[this.env],
        payload
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error estimating payout fee:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  async payout_status(reference_id: string): Promise<PayoutStatusResponse> {
    try {
      const endpoints = {
        test: `/api/v1/test/payout/${reference_id}/status`,
        live: `/api/v1/live/payout/${reference_id}/status`,
      };
      const response = await this.apiClient.get<any>(endpoints[this.env]);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching wallet transaction status:",
        error as AxiosError //.response?.data
      );
      throw error;
    }
  }
}
export default Payout;
