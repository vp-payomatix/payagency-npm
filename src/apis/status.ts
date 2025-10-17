import { AxiosError } from "axios";
import { ApiClientInstance } from "../lib/api-client";
import { PaymentStatusResponse } from "../types/payout";

class Status {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async status(id: string): Promise<PaymentStatusResponse> {
    try {
      const endpoints = {
        test: `/api/test/status/${id}`,
        live: `/api/live/status/${id}`,
      };
      const response = await this.apiClient.get<PaymentStatusResponse>(
        endpoints[this.env]
      );
      return response.data;
    } catch (error: any) {
      console.error("Error in status:", (error as AxiosError).response?.data);
      throw error;
    }
  }
}

export default Status;
