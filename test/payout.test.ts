import PayAgencyApi from "@paneruvipin/payagency";

// Make sure to use valid API keys and endpoints
const api = new PayAgencyApi({
  baseUrl: "https://api.pay.agency/api/v1",
  encryptionKey:
    process.env.ENCRYPTION_KEY || "89ca59fb3b49ada55851021df12cfbc5",
  authToken:
    process.env.AUTH_TOKEN ||
    "PA_TEST_94bf3520bcbe435f2ed558c31ac664f3e72dfa3114a3232e436e25f9",
});

describe("PayAgencyApi Payout Integration", () => {
  it("should create a payout", async () => {
    const payload = {
      wallet_id: "WAL7825818519632620",
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
      card_number: "4111111111111111",
      card_expiry_month: "12",
      card_expiry_year: "2027",
      webhook_url: "https://pay.agency/webhook",
      // order_id: "12524AGSDF34DS9",
      terminal_id: "T12345",
    };

    const response = await api.payout(payload);
    console.log("API Response:", response);

    expect(response).toHaveProperty("status");
    // expect(response.status).toBe("success");
  });

  it("should fetch wallets", async () => {
    const response = await api.wallets;
    console.log("Wallets Response:", response);

    expect(response).toHaveProperty("data");
    // expect(response.status).toBe("success");
  });
});
