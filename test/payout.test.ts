import { api } from "./utility";

describe("PayAgencyApi Payout Integration", () => {
  it("should create a payout", async () => {
    const payload = {
      wallet_id: "WAL1234567890",
      first_name: "James",
      last_name: "Dean",
      email: "james@gmail.com",
      address: "64 Hertingfordbury Rd",
      country: "US",
      city: "Newport",
      state: "US",
      zip: "TF10 8DF",
      ip_address: "127.0.0.1",
      phone_number: "7654233212",
      amount: 100,
      currency: "USD",
      card_number: "4222222222222222",
      card_expiry_month: "10",
      card_expiry_year: "2030",
      webhook_url: "https://pay.agency/webhook",
      // order_id: "12524AGSDF34DS9",
      terminal_id: "T12345",
    };

    const response = await api.Payout.payout(payload);
    console.log("API Response:", response);

    expect(response).toHaveProperty("status");
    // expect(response.status).toBe("success");
  });

  it("should fetch wallets", async () => {
    const response = await api.Payout.wallets
    console.log("Wallets Response:", response);

    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });

  it("should estimate payout fee", async () => {
    const payload = {
      wallet_id: "WAL7825818519632620",
      amount: 200,
      card_number: "4111111111111111",
    };

    const response = await api.Payout.esitimate_fee(payload);
    console.log("Estimate Payout Fee Response:", response);

    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });
  // it("should get payout status", async () => {
  //   const response = await api.payoutStatus("PA1877208010353680");
  //   console.log("Payout Status Response:", response);

  //   expect(response).toHaveProperty("data");
  // });
});
