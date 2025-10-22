import { CryptoOnRampLinkInput } from "@payagency/api";
import { api } from "./utility";

describe("PayAgencyApi Crypto Integration", () => {
  it("should create an on-ramp link", async () => {
    const payload:CryptoOnRampLinkInput = {
      fiat_amount: 100,
      fiat_currency: "GBP",
      crypto_currency: "BTC",
      payment_template_id: "PLI07435325281394735",
    } 
    const response = await api.Crypto.on_ramp_link(payload);
    console.log("On-Ramp Link Response:", response);

    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });

  it("should create an off-ramp link", async () => {
    const payload = {
      fiat_currency: "GBP",
      crypto_currency: "BTC",
      crypto_amount: "0.01",
      payment_template_id: "PLI07435325281394735",
    }
    const response = await api.Crypto.off_ramp_link(payload);
    console.log("Off-Ramp Link Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });

  it("should create a crypto payin link", async () => {
    const payload = {
      fiat_amount: 150,
      fiat_currency: "USD",
      crypto_currency: "BTC",
      payment_template_id: "PLI07435325281394735",
    }
    const response = await api.Crypto.payin_link(payload);
    console.log("Crypto Paying Link Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });

  it("should create a crypto onramp", async () => { 
    const payload = {
      first_name: "Diana",
      last_name: "Prince",
      email: "diana@pay.agency",
      phone_number: "0123456789",
      fiat_amount: 200,
      fiat_currency: "EUR",
      crypto_currency: "BTC",
      wallet_address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
      ip_address: "127.0.0.1",
      country: "GB",
      redirect_url: "https://pay.agency",
      webhook_url: "https://pay.agency/webhook",
      crypto_network: "BITCOIN"
    };
    const response = await api.Crypto.on_ramp(payload);
    console.log("Crypto Onramp Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success"); 
  })

  it("should create a crypto offramp", async () => { 
    const payload = {
      first_name: "Ethan",
      last_name: "Hunt",
      email: "ethan@pay.agency",
      fiat_currency: "GBP",
      crypto_currency: "BTC",
      crypto_amount: "0.05",
      phone_number: "0123456789",
      wallet_address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
      ip_address: "127.0.0.1",
      country: "GB",
      redirect_url: "https://pay.agency",
      webhook_url: "https://pay.agency/webhook",
      crypto_network: "BITCOIN"
    };
    const response = await api.Crypto.off_ramp(payload);
    console.log("Crypto Offramp Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success"); 
  });

  it("should fetch supported cryptocurrencies", async () => { 
    const params = {
      country: "GB",
      amount: 100,
    };
    const response = await api.Crypto.currencies(params);
    console.log("Supported Cryptocurrencies Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success"); 
  })

  it("should create a crypto payin", async () => { 
    const payload = {
      first_name: "Fiona",
      last_name: "Gallagher",
      email: "hello@gmail.com",
      address: "64 Hertingfordbury Rd",
      phone_number: "0123456789",
      ip_address: "127.0.0.1",
      crypto_currency: "BTC",
      amount: 300,
      currency: "USD",
      redirect_url: "https://pay.agency",
      webhook_url: "https://pay.agency/webhook",
      crypto_network: "BITCOIN",
      country: "US",
    };
    const response = await api.Crypto.payin(payload);
    console.log("Crypto Payin Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success"); 
  });
});
