import { AxiosError } from "axios";
import { ApiClientInstance } from "../lib/api-client";
import {
  CryptoExchangeCurrenciesPayload,
  CryptoExchangeCurrenciesResponse,
  CryptoOnRampOffRampPayload,
  CryptoOnRampOffRampResponse,
  CryptoPayinPayload,
  CryptoPayinResponse,
  CryptoPaymentLinkPayload,
  OfframpLinkPayload,
  OffRampPayload,
  OnrampLinkPayload,
  OnRampPayload,
  PayinLinkPayload,
} from "../types/crypto";
import { PaymentLinkResponse } from "../types/payment-link";

class Crypto {
  private apiClient: ApiClientInstance;
  private env: "test" | "live";

  constructor(apiClient: ApiClientInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  //crypto payment links
  async onRampLink(
    data: Omit<OnrampLinkPayload, "transaction_type">
  ): Promise<PaymentLinkResponse> {
    return await this.createPaymentLink({
      ...data,
      transaction_type: "ONRAMP",
    });
  }

  async offRampLink(
    data: Omit<OfframpLinkPayload, "transaction_type">
  ): Promise<PaymentLinkResponse> {
    return await this.createPaymentLink({
      ...data,
      transaction_type: "OFFRAMP",
    });
  }

  async payinLink(
    data: Omit<PayinLinkPayload, "transaction_type">
  ): Promise<PaymentLinkResponse> {
    return await this.createPaymentLink({ ...data, transaction_type: "PAYIN" });
  }

  // crypto onramp offramp

  async onRamp(
    data: Omit<OnRampPayload, "transaction_type">
  ): Promise<CryptoOnRampOffRampResponse> {
    return await this.onRampOffRamp({ ...data, transaction_type: "ONRAMP" });
  }

  async offRamp(
    data: Omit<OffRampPayload, "transaction_type">
  ): Promise<CryptoOnRampOffRampResponse> {
    return await this.onRampOffRamp({ ...data, transaction_type: "OFFRAMP" });
  }

  // payin
  async currencies(
    data: CryptoExchangeCurrenciesPayload
  ): Promise<CryptoExchangeCurrenciesResponse> {
    try {
      const endpoints = {
        test: "/api/v1/live/crypto/currencies",
        live: "/api/v1/live/crypto/currencies",
      };
      const response =
        await this.apiClient.post<CryptoExchangeCurrenciesResponse>(
          endpoints[this.env],
          data
        );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error on fetching crypto curriences:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  async payin(data: CryptoPayinPayload): Promise<CryptoPayinResponse> {
    try {
      const endpoints = {
        test: "/api/v1/test/crypto/payin",
        live: "/api/v1/live/crypto/payin",
      };
      const response = await this.apiClient.post<CryptoPayinResponse>(
        endpoints[this.env],
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error on  crypto payin:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }
  private async createPaymentLink(
    data: CryptoPaymentLinkPayload
  ): Promise<PaymentLinkResponse> {
    try {
      const endpoints = {
        test: "/api/v1/live/crypto/payment-link",
        live: "/api/v1/live/crypto/payment-link",
      };
      const response = await this.apiClient.post<PaymentLinkResponse>(
        endpoints[this.env],
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating crypto payment link:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }

  private async onRampOffRamp(
    data: CryptoOnRampOffRampPayload
  ): Promise<CryptoOnRampOffRampResponse> {
    try {
      const endpoints = {
        test: "/api/v1/test/crypto",
        live: "/api/v1/live/crypto",
      };
      const response = await this.apiClient.post<CryptoOnRampOffRampResponse>(
        endpoints[this.env],
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating crypto onnramp/offramp:",
        (error as AxiosError).response?.data
      );
      throw error;
    }
  }
}

export default Crypto;
