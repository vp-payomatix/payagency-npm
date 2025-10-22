import { AxiosError } from "axios";
import { PayAgencyInstance } from "../lib/api-client";
import {
  CryptoCurrenciesInput,
  CryptoCurrenciesOutput,
  CryptoOffRampInput,
  CryptoOffRampLinkInput,
  CryptoOnRampInput,
  CryptoOnRampLinkInput,
  CryptoPayinInput,
  CryptoPayinLinkInput,
  CryptoPayinOutput,
  CryptoPaymentInput,
  CryptoPaymentLinkInput,
  CryptoPaymentLinkOutput,
  CryptoPaymentOutput,
} from "../types/librery";

class Crypto {
  private apiClient: PayAgencyInstance;
  private env: "test" | "live";

  constructor(apiClient: PayAgencyInstance, env: "test" | "live" = "test") {
    this.apiClient = apiClient;
    this.env = env;
  }

  //crypto payment links
  async on_ramp_link(data: CryptoOnRampLinkInput) {
    return await this.payment_link({
      ...data,
      transaction_type: "ONRAMP",
    });
  }

  async off_ramp_link(data: CryptoOffRampLinkInput) {
    return await this.payment_link({
      ...data,
      transaction_type: "OFFRAMP",
    });
  }

  async payin_link(data: CryptoPayinLinkInput) {
    return await this.payment_link({ ...data, transaction_type: "PAYIN" });
  }

  // crypto onramp offramp

  async on_ramp(data: CryptoOnRampInput) {
    return await this.payment({ ...data, transaction_type: "ONRAMP" });
  }

  async off_ramp(data: CryptoOffRampInput) {
    return await this.payment({ ...data, transaction_type: "OFFRAMP" });
  }

  // payin
  async currencies(
    data: CryptoCurrenciesInput
  ): Promise<CryptoCurrenciesOutput> {
    try {
      const endpoints = {
        test: "/api/v1/test/crypto/currencies",
        live: "/api/v1/live/crypto/currencies",
      };
      const response = await this.apiClient.post<CryptoCurrenciesOutput>(
        endpoints[this.env],
        data,
        { params: { "Skip-Encryption": "true" } }
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

  async payin(data: CryptoPayinInput): Promise<CryptoPayinOutput> {
    try {
      const endpoints = {
        test: "/api/v1/test/crypto/payin",
        live: "/api/v1/live/crypto/payin",
      };
      const response = await this.apiClient.post<CryptoPayinOutput>(
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
    data: CryptoPaymentLinkInput
  ): Promise<CryptoPaymentLinkOutput> {
    try {
      const endpoints = {
        test: "/api/v1/crypto/payment-link",
        live: "/api/v1/crypto/payment-link",
      };
      const response = await this.apiClient.post<CryptoPaymentLinkOutput>(
        endpoints[this.env],
        data,
        { params: { "Skip-Encryption": "true" } }
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

  async payment(data: CryptoPaymentInput): Promise<CryptoPaymentOutput> {
    try {
      const endpoints = {
        test: "/api/v1/test/crypto",
        live: "/api/v1/live/crypto",
      };
      const response = await this.apiClient.post<CryptoPaymentOutput>(
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
