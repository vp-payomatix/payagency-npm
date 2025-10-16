import { AxiosError } from "axios";
import { PaymentResponse } from "../dts/s2s.dts";
import { ApiClientInstance } from "../lib/api-client";
import { HostedPaymentRequest } from "../dts/hosted.dts";
import {
  PayoutPayload,
  PayoutResponse,
  WalletsResponse,
} from "../dts/payout.dts";

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
          data: [
            {
              wallet_id: "WAL1234567890",
              currency: "USD",
              amount: 10000,
              payment_method: "card",
              status: "Active",
            },
            {
              wallet_id: "WAL9876543210",
              currency: "EUR",
              amount: 5000,
              payment_method: "card",
              status: "Inactive",
            },
          ],
        };
      }
      const response = await this.apiClient.get<WalletsResponse>(
        endpoints[this.env]
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching wallets:",
        error as AxiosError
        // .response?.data
      );
      throw error;
    }
  }
}

export default Payout;
