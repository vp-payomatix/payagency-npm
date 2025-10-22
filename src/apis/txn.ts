import { AxiosError } from "axios";
import { PayAgencyInstance } from "../lib/api-client";
import { PaymentStatusOutput, TransactionsInput, TransactionsOutput } from "../types/librery";

class TXN {
  private apiClient: PayAgencyInstance;
  private env: "test" | "live";

  constructor(apiClient: PayAgencyInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async transactions(params: TransactionsInput): Promise<TransactionsOutput> {
    try {
      const endpoints = {
        test: `/api/v1/test-transactions`,
        live: `/api/v1/live-transactions`,
      };
      const response = await this.apiClient.get<TransactionsOutput>(
        endpoints[this.env],
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Eroor in transction:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  async wallet_transaction(
    params: TransactionsInput
  ): Promise<TransactionsOutput> {
    try {
      const endpoints = {
        test: `/api/v1/test-wallet-transactions`,
        live: `/api/v1/live-wallet-transactions`,
      };
      const response = await this.apiClient.get<TransactionsOutput>(
        endpoints[this.env],
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Eroor in transction:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  async status(id: string): Promise<PaymentStatusOutput> {
    try {
      const endpoints = {
        test: `/api/test/status/${id}`,
        live: `/api/live/status/${id}`,
      };
      const response = await this.apiClient.get<PaymentStatusOutput>(
        endpoints[this.env]
      );
      return response.data;
    } catch (error: any) {
      console.error("Error in status:", (error as AxiosError).response?.data);
      throw error;
    }
  }
}

export default TXN;
