import { AxiosError } from "axios";
import { PaymentResponse } from "../types/s2s";
import { ApiClientInstance } from "../lib/api-client";
import { RefundPayload, RefundResponse } from "../types/payout";

class Refund {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async create(data: RefundPayload): Promise<RefundResponse> {
    try {
      const endpoints = {
        test: `/api/v1/test/refund`,
        live: `/api/v1/live/refund`,
      };
      const response = await this.apiClient.post<RefundResponse>(
        endpoints[this.env],
        data,
        { params: { "Skip-Encryption": "true" } }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error in Refund:", (error as AxiosError).response?.data);
      throw error;
    }
  }
}

export default Refund;
