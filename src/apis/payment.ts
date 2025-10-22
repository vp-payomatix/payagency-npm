import { AxiosError } from "axios";
import { PayAgencyInstance } from "../lib/api-client";
import {
  APMInput,
  APMOutput,
  HostedInput,
  HostedOutput,
  S2SInput,
  S2SOutput,
} from "../types/librery";

class Payment {
  private apiClient: PayAgencyInstance;
  private env: "test" | "live";

  constructor(apiClient: PayAgencyInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  async S2S(data: S2SInput): Promise<S2SOutput> {
    try {
      const endpoints = {
        test: "/api/v1/test/card",
        live: "/api/v1/live/card",
      };
      const response = await this.apiClient.post<S2SOutput>(
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

  async hosted(data: HostedInput): Promise<HostedOutput> {
    try {
      const endpoints = {
        test: "/api/v1/test/hosted/card",
        live: "/api/v1/live/hosted/card",
      };
      const response = await this.apiClient.post<HostedOutput>(
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

  async APM(data: APMInput): Promise<APMOutput> {
    try {
      const endpoints = {
        test: "/api/v1/test/apm",
        live: "/api/v1/live/apm",
      };
      const response = await this.apiClient.post<APMOutput>(
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

export default Payment;
