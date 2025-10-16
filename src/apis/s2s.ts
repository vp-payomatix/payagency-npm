import { AxiosError } from "axios";
import { PaymentPayload, PaymentResponse } from "../dts/s2s.dts";
import { ApiClientInstance } from "../lib/api-client";

class S2SPayment {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async createPayment(data: PaymentPayload): Promise<PaymentResponse> {
    try {
      const endpoints = {
        test: "/test/card",
        live: "/live/card",
      };
      const response = await this.apiClient.post<PaymentResponse>(
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
}

export default S2SPayment;
