import { api } from "./utility";

describe("PayAgencyApi Payment Link Integration", () => {
  it("should create a payment link", async () => {
    const payload = {
      payment_template_id: "PLI07435325281394735",
    };
    const response = await api.createPaymentLink(payload);
    console.log("Create Payment Link Response:", response);
  });

  it("should fetch payment link templates", async () => {
    const response = await api.paymentLinkTemplates;
    console.log("Payment Link Templates Response:", response);
  });
});
