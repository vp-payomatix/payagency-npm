import { AxiosError } from "axios";
import { ApiClientInstance } from "../lib/api-client";
import {
  CreatePaymentLinkPayload,
  PaymentLinkResponse,
  PaymentTemplateResponse,
} from "../types/payment-link";
import {
  PaymentLinkCreateInput,
  PaymentLinkCreateOutput,
  PaymentTemplateGetOutput,
} from "../types/librery";

class PaymentLink {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  get templates() {
    return this.getTemplates();
  }

  async create(data: PaymentLinkCreateInput): Promise<PaymentLinkCreateOutput> {
    try {
      const endpoints = {
        test: "/api/v1/payment-link",
        live: "/api/v1/payment-link",
      };
      const response = await this.apiClient.post<PaymentLinkCreateOutput>(
        endpoints[this.env],
        data,
        { params: { "Skip-Encryption": "true" } }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating payment Link:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  private async getTemplates(): Promise<PaymentTemplateGetOutput> {
    try {
      const endpoints = {
        test: "/api/v1/payment-templates",
        live: "/api/v1/payment-templates",
      };
      if (this.env === "test") {
        return { data: [] };
      }
      const response = await this.apiClient.get<PaymentTemplateResponse>(
        endpoints[this.env]
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching payment link templates:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }
}

export default PaymentLink;

