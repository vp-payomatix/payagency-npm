import { AxiosError } from "axios";
import { ApiClientInstance } from "../lib/api-client";
import { TransactionParams, TransactionsResponse } from "../types/txn";

class TXN {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async getTransaction(
    params: TransactionParams
  ): Promise<TransactionsResponse> {
    try {
      const endpoints = {
        test: `/api/v1/test-transactions`,
        live: `/api/v1/live-transactions`,
      };
      const response = await this.apiClient.get<TransactionsResponse>(
        endpoints[this.env],
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Eroor in transction:",
        (error as AxiosError)
        // .response?.data
      );
      throw error;
    }
  }

  async getPayoutTransaction(
    params: TransactionParams
  ): Promise<TransactionsResponse> {
    try {
      const endpoints = {
        test: `/api/v1/test-wallet-transactions`,
        live: `/api/v1/live-wallet-transactions`,
      };
      const response = await this.apiClient.get<TransactionsResponse>(
        endpoints[this.env],
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Eroor in transction:",
        (error as AxiosError)
        // .response?.data
      );
      throw error;
    }
  }
}

export default TXN;
