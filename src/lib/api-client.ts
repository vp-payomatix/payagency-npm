import axios from "axios";
import type { AxiosInstance } from "axios";
import { randomBytes, createCipheriv } from "crypto";

export interface PayAgencyClientOptions {
  encryptionKey: string;
  secretKey: string;
  baseUrl?: string;
}

/**
 * Encrypts data using AES-256-CBC.
 */
function encryptData(data: string, key: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(key, "utf-8"), iv);

  let encrypted = cipher.update(data, "utf-8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

/**
 * API client using Axios instance with request interceptor
 */
export class ApiClient {
  private axiosInstance: AxiosInstance;
  private encryptionKey: string;
  private env: "test" | "live";
  constructor(options: PayAgencyClientOptions) {
    this.encryptionKey = options.encryptionKey;
    this.env = options?.secretKey?.startsWith("PA_LIVE_") ? "live" : "test";
    const baseUrl = options?.baseUrl
      ? options?.baseUrl?.replace(/\/+$/, "") // Ensure no trailing slash
      : "https://backend.pay.agency";

    this.axiosInstance = axios.create({
      baseURL: baseUrl?.startsWith("https://") ? baseUrl : `https://${baseUrl}`, // Ensure it starts with https
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options?.secretKey}`,
      },
      timeout: 15000,
    });
    // Add request interceptor for automatic encryption
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (config.data && config.params?.["Skip-Encryption"] !== "true") {
          // Encrypt the request payload
          config.data = {
            payload: encryptData(
              JSON.stringify(config.data),
              this.encryptionKey
            ),
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  get instance() {
    return this.axiosInstance;
  }

  get environment() {
    return this.env;
  }
}

export type PayAgencyInstance = ApiClient["instance"];
