import { api } from "./utility";

describe("PayAgencyApi APM Integration", () => {
  it("should create a payment ", async () => {
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

    const response = await api.apm(payload);
    console.log("API Response:", response);

    expect(response).toHaveProperty("status");
    // expect(response.status).toBe("success");
  });

  it("should fetch payment status", async () => {
    const paymentId = "12524AGSDF34DS9";
    const response = await api.status(paymentId);
    console.log("Payment Status Response:", response);
    expect(response).toHaveProperty("status");
    // expect(response.status).toBe("success");
  });

  it("should create a refund", async () => {
    try {
      const payload = {
        transaction_id: "PA8526657613328459",
        reason: "Product returned",
      };
      const response = await api.refund(payload);
      console.log("Refund Response:", response);

      expect(response).toHaveProperty("status");
      // expect(response.status).toBe("success");
    } catch (error) {
      expect(JSON.stringify((error as any)?.response.data)).toContain("Transaction");
    }
  });
});
