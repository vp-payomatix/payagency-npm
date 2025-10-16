import { AxiosError } from "axios";
import { ApiClientInstance } from "../lib/api-client";
import {
  PayoutPayload,
  PayoutResponse,
  WalletsResponse,
} from "../dts/payout.dts";
import { testWallets } from "../lib/test-wallets";

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
}

export default Payout;
