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
  async on_ramp_link(
    data: Omit<OnrampLinkPayload, "transaction_type">
  ): Promise<PaymentLinkResponse> {
    return await this.payment_link({
      ...data,
      transaction_type: "ONRAMP",
    });
  }

  async off_ramp_link(
    data: Omit<OfframpLinkPayload, "transaction_type">
  ): Promise<PaymentLinkResponse> {
    return await this.payment_link({
      ...data,
      transaction_type: "OFFRAMP",
    });
  }

  async payin_link(
    data: Omit<PayinLinkPayload, "transaction_type">
  ): Promise<PaymentLinkResponse> {
    return await this.payment_link({ ...data, transaction_type: "PAYIN" });
  }

  // crypto onramp offramp

  async on_ramp(
    data: Omit<OnRampPayload, "transaction_type">
  ): Promise<CryptoOnRampOffRampResponse> {
    return await this.payment({ ...data, transaction_type: "ONRAMP" });
  }

  async off_ramp(
    data: Omit<OffRampPayload, "transaction_type">
  ): Promise<CryptoOnRampOffRampResponse> {
    return await this.payment({ ...data, transaction_type: "OFFRAMP" });
  }

  // payin
  async currencies(
    data: CryptoExchangeCurrenciesPayload
  ): Promise<CryptoExchangeCurrenciesResponse> {
    try {
      const endpoints = {
        test: "/api/v1/test/crypto/currencies",
        live: "/api/v1/live/crypto/currencies",
      };
      const response =
        await this.apiClient.post<CryptoExchangeCurrenciesResponse>(
          endpoints[this.env],
          data,
          {params:{ "Skip-Encryption": "true"}}
        );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error on fetching crypto curriences:",
        (error as AxiosError)
        .response?.data
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
   async payment_link(
    data: CryptoPaymentLinkPayload
  ): Promise<PaymentLinkResponse> {
    try {
      const endpoints = {
        test: "/api/v1/crypto/payment-link",
        live: "/api/v1/crypto/payment-link",
      };
      console.log("Creating crypto payment link with data:", data);
      const response = await this.apiClient.post<PaymentLinkResponse>(
        endpoints[this.env],
        data,
        {params: { "Skip-Encryption": "true" }}
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating crypto payment link:",
        (error as AxiosError)
        .response?.data
      );
      throw error;
    }
  }

  private async payment(
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
