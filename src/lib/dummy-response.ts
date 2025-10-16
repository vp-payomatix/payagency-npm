export const testWallets = [
  {
    wallet_id: "WAL1234567890",
    currency: "USD",
    amount: 10000,
    payment_method: "card",
    status: "Active",
  },
  {
    wallet_id: "WAL9876543210",
    currency: "EUR",
    amount: 5000,
    payment_method: "card",
    status: "Inactive",
  },
];

export const testEstimatePayoutResponse = {
  data: {
    amount_requried: 211.5,
    wallet_balance: 1000,
    total_fee: 11.5,
  },
};
