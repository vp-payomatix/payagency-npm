import { api } from "./utility";

describe("PayAgencyApi Crypto Integration", () => {
  it("should create an on-ramp link", async () => {
    const payload = {
      first_name: "Alice",
      last_name: "Smith",
      email: "hello@gmail.com",
      // required fields for OnrampLinkPayload (transaction_type is omitted by the API helper)
      fiat_amount: 100,
      fiat_currency: "GBP",
      crypto_currency: "BTC",
      payment_template_id: "PT1234567890",
    };
    const response = await api.crypto.onRampLink(payload);
    console.log("On-Ramp Link Response:", response);

    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });

  it("should create an off-ramp link", async () => {
    const payload = {
      first_name: "Bob",
      last_name: "Johnson",
      email: "hell@gmai.com",
      // required fields for OfframpLinkPayload (transaction_type is omitted by the API helper)
      fiat_currency: "GBP",
      crypto_currency: "BTC",
      crypto_amount: "0.01",
      payment_template_id: "PT1234567890",
    };
    const response = await api.crypto.offRampLink(payload);
    console.log("Off-Ramp Link Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });

  it("should create a crypto paying link", async () => {
    const payload = {
      first_name: "Charlie",
      last_name: "Brown",
      email: "hello@gmail.com",
      // required fields for PayinLinkPayload (transaction_type is omitted by the API helper)
      fiat_amount: 150,
      fiat_currency: "USD",
      crypto_currency: "BTC",
      payment_template_id: "PT1234567890",
      redirect_url: "https://pay.agency",
      webhook_url: "https://pay.agency/webhook",
    };
    const response = await api.crypto.payinLink(payload);
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
    };
    const response = await api.crypto.onRamp(payload);
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
    };
    const response = await api.crypto.offRamp(payload);
    console.log("Crypto Offramp Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success"); 
  });

  it("should fetch supported cryptocurrencies", async () => { 
    const params = {
      country: "GB",
      amount: 100,
    };
    const response = await api.crypto.currencies(params);
    console.log("Supported Cryptocurrencies Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success"); 
  })

  it("should create a crypto payin", async () => { 
    const payload = {
      first_name: "Fiona",
      last_name: "Gallagher",
      email: " ",
      address: "64 Hertingfordbury Rd",
      phone_number: "0123456789",
      ip_address: "127.0.0.1",
      crypto_currency: "BTC",
      amount: 300,
      currency: "USD",
      redirect_url: "https://pay.agency",
      webhook_url: "https://pay.agency/webhook",
    };
    const response = await api.crypto.payin(payload);
    console.log("Crypto Payin Response:", response);
    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success"); 
  });
});
