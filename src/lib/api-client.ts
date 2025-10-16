import axios from "axios";
import type { AxiosInstance } from "axios";
import { randomBytes, createCipheriv } from "crypto";

export interface ApiClientOptions {
  encryptionKey: string;
  authToken: string;
  baseUrl: string;
  environment?: "test" | "live";
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
  constructor(options: ApiClientOptions) {
    this.encryptionKey = options.encryptionKey;
    this.env = options.environment || "test";
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.authToken}`,
      },
      timeout: 15000,
    });

    // Add request interceptor for automatic encryption
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (config.data) {
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

export type ApiClientInstance = ApiClient["instance"];

