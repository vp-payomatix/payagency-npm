import { AxiosError } from "axios";
import { PayAgencyInstance } from "../lib/api-client";
import { RefundInput, RefundOutput } from "../types/librery";

class Refund {
  private apiClient: PayAgencyInstance;
  private env: "test" | "live";

  constructor(apiClient: PayAgencyInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async create(data: RefundInput): Promise<RefundOutput> {
    try {
      const endpoints = {
        test: `/api/v1/test/refund`,
        live: `/api/v1/live/refund`,
      };
      const response = await this.apiClient.post<RefundOutput>(
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
