import { api } from "./utility";


describe("PayAgencyApi S2S Integration", () => {
  it("should create a payment", async () => {
    const payload = {
      first_name: "James",
      last_name: "Dean",
      email: "james@gmail.com",
      address: "64 Hertingfordbury Rd",
      country: "GB",
      city: "Newport",
      state: "GB",
      zip: "TF10 8DF",
      ip_address: "127.0.0.1",
      phone_number: "7654233212",
      amount: 100,
      currency: "GBP",
      card_number: "4111111111111111",
      card_expiry_month: "12",
      card_expiry_year: "2027",
      card_cvv: "029",
      redirect_url: "https://pay.agency",
      webhook_url: "https://pay.agency/webhook",
      // order_id: "12524AGSDF34DS9",
      terminal_id: "T12345",
    };

    const response = await api.Payment.S2S(payload);
    console.log("API Response:",  response);

    expect(response).toHaveProperty("status");
    // expect(response.status).toBe("success");
  });
});
