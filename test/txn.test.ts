import { api } from "./utility";

describe("PayAgencyApi TXN Integration", () => {
  it("should fetch transactions", async () => {
    const params = {
      transaction_start_date: "2023-01-01",
      transaction_end_date: "2023-12-31",
    };
    const response = await api.TXN.transactions(params);
    console.log("Transactions Response:", response);

    expect(response).toHaveProperty("data");
    expect(response).toHaveProperty("meta");
  });

  it("should fetch payout transactions", async () => {
    const params = {
      transaction_start_date: "2023-01-01",
      transaction_end_date: "2023-12-31",
    };
    console.log("Fetching Payout Transactions with params:", api, api.TXN);
    const response = await api.TXN.wallet_transaction(params);
    console.log("Payout Transactions Response:", response);
    expect(response).toHaveProperty("data");
    expect(response).toHaveProperty("meta");
  });
});
