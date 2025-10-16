import { AxiosError } from "axios";
import { ApiClientInstance } from "../lib/api-client";
import {
  EstimatePayoutPayload,
  EstimatePayoutResponse,
  PayoutPayload,
  PayoutResponse,
  PayoutStatusResponse,
  WalletsResponse,
} from "../dts/payout.dts";
import { testEstimatePayoutResponse, testWallets } from "../lib/dummy-response";

class Payout {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async createPayment(data: PayoutPayload): Promise<PayoutResponse> {
    try {
      const endpoints = {
        test: "/test/payout",
        live: "/live/payout",
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

  async getWallets(): Promise<WalletsResponse> {
    try {
      const endpoints = {
        test: "/wallet",
        live: "/wallet",
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

  async esitimatePayoutFee(
    payload: EstimatePayoutPayload
  ): Promise<EstimatePayoutResponse> {
    try {
      const endpoints = {
        test: "/wallet/estimate-payout",
        live: "/wallet/estimate-payout",
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

  async getPayoutStatus(reference_id: string): Promise<PayoutStatusResponse> {
    try {
      const endpoints = {
        test: `/test/payout/${reference_id}/status`,
        live: `/live/payout/${reference_id}/status`,
      };
      const response = await this.apiClient.get<any>(
        endpoints[this.env]
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching wallet transaction status:",
        (error as AxiosError) //.response?.data
      );
      throw error;
    }   
  }
}
export default Payout;
