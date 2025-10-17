import { api } from "./utility";

describe("PayAgencyApi Hosted Integration", () => {
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
      redirect_url: "https://pay.agency",
      webhook_url: "https://pay.agency/webhook",
      // order_id: "12524AGSDF34DS9",
      terminal_id: "T12345",
    };

    const response = await api.hosted(payload);
    console.log("API Response:", response);

    expect(response).toHaveProperty("status");
    // expect(response.status).toBe("success");
  });
});
