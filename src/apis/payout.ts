import { AxiosError } from "axios";
import { PayAgencyInstance } from "../lib/api-client";
import { testEstimatePayoutResponse, testWallets } from "../lib/dummy-response";
import {
  EstimateFeeInput,
  EstimateFeeOutput,
  PayoutInput,
  PayoutOutput,
  PayoutStatusOutput,
  WalletsOutput,
} from "../types/librery";

class Payout {
  private apiClient: PayAgencyInstance;
  private env: "test" | "live";

  constructor(apiClient: PayAgencyInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async payout(data: PayoutInput): Promise<PayoutOutput> {
    try {
      const endpoints = {
        test: "/api/v1/test/payout",
        live: "/api/v1/live/payout",
      };
      const response = await this.apiClient.post<PayoutOutput>(
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

  async get_wallets(): Promise<WalletsOutput> {
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
      const response = await this.apiClient.get<WalletsOutput>(
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

  async esitimate_fee(payload: EstimateFeeInput): Promise<EstimateFeeOutput> {
    try {
      const endpoints = {
        test: "/api/v1/wallet/estimate-payout",
        live: "/api/v1/wallet/estimate-payout",
      };
      if (this.env === "test") {
        return testEstimatePayoutResponse;
      }
      const response = await this.apiClient.post<EstimateFeeOutput>(
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

  async payout_status(reference_id: string): Promise<PayoutStatusOutput> {
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
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }
}
export default Payout;
