import { AxiosError } from "axios";
import { PaymentResponse } from "../types/s2s";
import { ApiClientInstance } from "../lib/api-client";
import { HostedPaymentRequest } from "../types/hosted";

class ApmPayment {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async createPayment(data: HostedPaymentRequest): Promise<PaymentResponse> {
    try {
      const endpoints = {
        test: "/api/v1/test/apm",
        live: "/api/v1/live/apm",
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

export default ApmPayment;
