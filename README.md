# PayAgency API SDK

A comprehensive TypeScript SDK for PayAgency payment processing platform, supporting multiple payment methods including card payments, cryptocurrency transactions, payouts, and payment links.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [Payment](#payment)
  - [Payout](#payout)
  - [Payment Links](#payment-links)
  - [Cryptocurrency](#cryptocurrency)
  - [Transactions](#transactions)
  - [Refunds](#refunds)
- [Error Handling](#error-handling)
- [Security](#security)
- [Environment](#environment)
- [TypeScript Support](#typescript-support)
- [License](#license)

## Installation

```bash
npm install @payagency/api
```

## Quick Start

```typescript
import PayAgencyApi from "@payagency/api";

// Initialize the SDK with minimal configuration
const payAgency = new PayAgencyApi({
  encryptionKey: "89ca59fb3b49ada55851021df12cfbc5", // 32-character encryption key
  secretKey: "PA_TEST_your-secret-key", // or PA_LIVE_ for production
  // baseUrl is optional - defaults to https://backend.pay.agency
});

// Or with custom base URL
const payAgency = new PayAgencyApi({
  encryptionKey: "89ca59fb3b49ada55851021df12cfbc5",
  secretKey: "PA_TEST_your-secret-key",
  baseUrl: "https://api.pay.agency",
});

// Make a payment
const payment = await payAgency.Payment.S2S({
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
  terminal_id: "T12345", // optional
});
```

## Configuration

### ApiClientOptions

| Parameter       | Type   | Required | Description                                                       |
| --------------- | ------ | -------- | ----------------------------------------------------------------- |
| `encryptionKey` | string | Yes      | 32-character encryption key for payload encryption                |
| `secretKey`     | string | Yes      | Your API secret key (PA*TEST* for test, PA*LIVE* for live)        |
| `baseUrl`       | string | No       | PayAgency API base URL (defaults to `https://backend.pay.agency`) |

### Environment Detection

The SDK automatically detects the environment based on your secret key:

- Keys starting with `PA_LIVE_` use live endpoints
- Keys starting with `PA_TEST_` use test endpoints

## API Reference

### Payment

The Payment module supports multiple payment methods:

#### Server-to-Server (S2S) Card Payments

```typescript
const result = await payAgency.Payment.S2S({
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
  webhook_url: "https://pay.agency/webhook", // optional
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
});

// Response format:
interface PaymentResponse {
  status: "SUCCESS" | "REDIRECT" | "FAILED";
  message: string;
  data: {
    amount: number;
    currency: string;
    order_id: string | null;
    transaction_id: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
    refund: {
      status: boolean;
      refund_date: string | null;
    };
    chargeback: {
      status: boolean;
      chargeback_date: string | null;
    };
  };
  redirect_url?: string; // Present for REDIRECT status
}
```

#### Hosted Payment

```typescript
const hostedPayment = await payAgency.Payment.hosted({
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
  webhook_url: "https://pay.agency/webhook", // optional
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
});

// Returns the same PaymentResponse format as S2S
```

#### Alternative Payment Methods (APM)

```typescript
const apmPayment = await payAgency.Payment.APM({
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
  webhook_url: "https://pay.agency/webhook", // optional
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
});

// Returns the same PaymentResponse format as S2S
```

### Payout

Manage payouts and wallet operations:

#### Create Payout

```typescript
const payout = await payAgency.Payout.payout({
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
  webhook_url: "https://pay.agency/webhook", // optional
  order_id: "ORDER_123", // optional
});

// Response format:
interface PayoutResponse {
  status: "SUCCESS" | "BLOCKED" | "PENDING";
  message: string;
  data: {
    amount: number;
    currency: string;
    order_id: string | null;
    transaction_id: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
  };
  redirect_url?: string;
}
```

#### Get Wallets

```typescript
// Get all wallets
const wallets = await payAgency.Payout.wallets;

// Or use the method directly
const walletsData = await payAgency.Payout.get_wallets();

// Response format:
interface WalletsResponse {
  data: Array<{
    wallet_id: string;
    currency: string;
    amount: number;
    payment_method: string;
    status: "Active" | "Inactive";
  }>;
}
```

#### Estimate Payout Fee

```typescript
const feeEstimate = await payAgency.Payout.esitimate_fee({
  wallet_id: "WAL7825818519632620",
  amount: 200,
  card_number: "4111111111111111",
});

// Response format:
interface EstimatePayoutResponse {
  data: {
    amount_requried: number;
    wallet_balance: number;
    total_fee: number;
  };
}
```

#### Check Payout Status

```typescript
const status = await payAgency.Payout.payout_status("PAYOUT_REFERENCE_123");

// Response format:
interface PayoutStatusResponse {
  status: "SUCCESS" | "PENDING" | "FAILED";
  message: string;
  data: {
    amount: number;
    currency: string;
    order_id: string | null;
    transaction_id: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}
```

### Payment Links

Create and manage payment links:

#### Create Payment Link

```typescript
const paymentLink = await payAgency.PaymentLink.create({
  payment_template_id: "PLI07435325281394735", // Required
  amount: 1000, // optional
  currency: "USD", // optional
  expiry_date: "2024-12-31", // optional
  terminal_id: "T12345", // optional
  order_id: "ORDER_123", // optional
});

// Response format:
interface PaymentLinkResponse {
  message: string;
  data: string; // The payment link URL
}
```

#### Get Payment Templates

```typescript
const templates = await payAgency.PaymentLink.templates;

// Response format:
interface PaymentTemplateResponse {
  data: Array<{
    template_id: string;
    template_name: string;
    payment_template_id: string;
    template_screenshot: string;
    redirect_url: string;
    webhook_url: string;
  }>;
}
```

### Cryptocurrency

Handle cryptocurrency transactions:

#### OnRamp (Fiat to Crypto)

```typescript
// Create OnRamp payment link
const onRampLink = await payAgency.Crypto.on_ramp_link({
  fiat_amount: 100,
  fiat_currency: "GBP",
  crypto_currency: "BTC",
  payment_template_id: "PLI07435325281394735",
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
  expiry_date: "2024-12-31", // optional
});

// Direct OnRamp transaction
const onRamp = await payAgency.Crypto.on_ramp({
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
  crypto_network: "BITCOIN",
  redirect_url: "https://pay.agency",
  webhook_url: "https://pay.agency/webhook", // optional
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
});

// Response format:
interface CryptoOnRampOffRampResponse {
  status: "REDIRECT" | "PENDING" | "FAILED";
  message: string;
  redirect_url?: string;
  data: {
    transaction_id: string;
    fiat: string;
    fiat_amount: number;
    crypto: string;
    crypto_amount: number;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}
```

#### OffRamp (Crypto to Fiat)

```typescript
// Create OffRamp payment link
const offRampLink = await payAgency.Crypto.off_ramp_link({
  fiat_currency: "GBP",
  crypto_currency: "BTC",
  crypto_amount: "0.01",
  payment_template_id: "PLI07435325281394735",
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
  expiry_date: "2024-12-31", // optional
});

// Direct OffRamp transaction
const offRamp = await payAgency.Crypto.off_ramp({
  first_name: "Ethan",
  last_name: "Hunt",
  email: "ethan@pay.agency",
  phone_number: "0123456789",
  fiat_currency: "GBP",
  crypto_currency: "BTC",
  crypto_amount: "0.05",
  wallet_address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
  ip_address: "127.0.0.1",
  country: "GB",
  crypto_network: "BITCOIN",
  redirect_url: "https://pay.agency",
  webhook_url: "https://pay.agency/webhook", // optional
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
});

// Returns the same CryptoOnRampOffRampResponse format
```

#### Crypto PayIn

```typescript
// Get supported currencies
const currencies = await payAgency.Crypto.currencies({
  country: "GB", // ISO 3166-1 alpha-2 country code
  amount: 100,
});

// Response format:
interface CryptoExchangeCurrenciesResponse {
  message: string;
  data: Array<{
    name: string;
    code: string;
    symbol: string;
  }>;
}

// Create PayIn link
const payinLink = await payAgency.Crypto.payin_link({
  fiat_amount: 150,
  fiat_currency: "USD",
  crypto_currency: "BTC",
  payment_template_id: "PLI07435325281394735",
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
  expiry_date: "2024-12-31", // optional
});

// Direct crypto payin
const payin = await payAgency.Crypto.payin({
  first_name: "Fiona",
  last_name: "Gallagher",
  email: "hello@gmail.com",
  address: "64 Hertingfordbury Rd",
  phone_number: "0123456789",
  ip_address: "127.0.0.1",
  crypto_currency: "BTC",
  amount: 300,
  currency: "USD",
  crypto_network: "BITCOIN",
  country: "US",
  redirect_url: "https://pay.agency",
  webhook_url: "https://pay.agency/webhook", // optional
  order_id: "ORDER_123", // optional
  terminal_id: "T12345", // optional
});

// Response format:
interface CryptoPayinResponse {
  status: "SUCCESS" | "PENDING" | "FAILED";
  message: string;
  redirect_url?: string;
  data: {
    amount: number;
    currency: string;
    order_id: string | null;
    transaction_id: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
    crypto_currency: string;
  };
}
```

### Transactions

Query transaction history:

#### Get Transactions

```typescript
const transactions = await payAgency.TXN.transactions({
  transaction_start_date: "2023-01-01", // optional
  transaction_end_date: "2023-12-31", // optional
  nextCursor: "cursor_value", // optional - for pagination
  prevCursor: "cursor_value", // optional - for pagination
});

// Response format:
interface TransactionsResponse {
  message: string;
  data: Array<{
    first_name: string;
    last_name: string;
    converted_amount: string;
    converted_currency: string;
    transaction_id: string;
    amount: string;
    currency: string;
    status: string;
    card_type: string | null;
    card_number: string | null;
    transaction_type: string;
    order_id: string | null;
    country: string;
    email: string;
    created_at: string;
    transaction_date: string;
    chargeback_date: string | null;
    refund_date: string | null;
    suspicious_date: string | null;
    merchant_connector: {
      name: string;
    };
    user: {
      name: string;
      user_kyc: {
        name: string;
      };
    };
  }>;
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextCursor?: string;
    prevCursor?: string;
    totalCount: number;
  };
}
```

#### Get Wallet Transactions

```typescript
const walletTransactions = await payAgency.TXN.wallet_transaction({
  transaction_start_date: "2023-01-01", // optional
  transaction_end_date: "2023-12-31", // optional
  nextCursor: "cursor_value", // optional - for pagination
  prevCursor: "cursor_value", // optional - for pagination
});

// Returns the same TransactionsResponse format
```

### Refunds

Process refunds:

```typescript
// Direct refund method
const refund = await payAgency.refund({
  reason: "Customer request",
  transaction_id: "TXN_123",
});

// Response format:
interface RefundResponse {
  status: "SUCCESS";
  message: string;
  data: {
    amount: number;
    currency: string;
    order_id: string | null;
    transaction_id: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
    };
    refund: {
      status: boolean;
      refund_date: string | null;
    };
    chargeback: {
      status: boolean;
      chargeback_date: string | null;
    };
  };
}
```

## Error Handling

The SDK uses Axios for HTTP requests and will throw errors for failed requests:

```typescript
try {
  const payment = await payAgency.Payment.S2S(paymentData);
  console.log("Payment successful:", payment);
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error("Payment failed:", error.response.data);
  } else if (error.request) {
    // Network error
    console.error("Network error:", error.message);
  } else {
    // Other error
    console.error("Error:", error.message);
  }
}
```

## Security

### Encryption

The SDK automatically encrypts request payloads using AES-256-CBC encryption with your provided encryption key. Some endpoints (like payment links and refunds) skip encryption as indicated by the `Skip-Encryption` parameter.

### API Key Security

- Never expose your API keys in client-side code
- Use test keys (`PA_TEST_`) for development
- Use live keys (`PA_LIVE_`) only in production
- Rotate your keys regularly

### Best Practices

1. Store API keys in environment variables
2. Use HTTPS for all webhook URLs
3. Validate webhook signatures on your server
4. Implement proper error handling
5. Log transactions for auditing

## Environment

The SDK supports both test and live environments:

### Test Environment

- Use secret keys starting with `PA_TEST_`
- Returns mock data for certain endpoints (wallets, fee estimation)
- Safe for development and testing

### Live Environment

- Use secret keys starting with `PA_LIVE_`
- Processes real transactions
- Use only in production

## TypeScript Support

The SDK is written in TypeScript and provides comprehensive type definitions:

```typescript
import PayAgencyApi, {
  ApiClientOptions,
  PayAgencyInstance,
  S2SInput,
  S2SOutput,
  PaymentResponse,
  PayoutInput,
  PayoutOutput,
  CryptoPaymentInput,
  CryptoPaymentOutput,
  RefundInput,
  RefundOutput,
} from "@payagency/api";

// All interfaces and types are exported for your use
const options: ApiClientOptions = {
  encryptionKey: "your-key",
  secretKey: "PA_TEST_key",
  // baseUrl is optional - will default to https://backend.pay.agency
};
```

## Available Types

The SDK exports comprehensive TypeScript interfaces for all operations. All examples above show the actual type structures used by the API.

### Key Exported Types

```typescript
import PayAgencyApi, {
  // Core types
  ApiClientOptions,
  PayAgencyInstance,

  // Payment types
  S2SInput,
  S2SOutput,
  HostedInput,
  HostedOutput,
  APMInput,
  APMOutput,

  // Payout types
  PayoutInput,
  PayoutOutput,
  WalletsOutput,
  EstimateFeeInput,
  EstimateFeeOutput,
  PayoutStatusOutput,

  // Payment Link types
  PaymentLinkCreateInput,
  PaymentLinkCreateOutput,
  PaymentTemplatesOutput,

  // Crypto types
  CryptoOnRampInput,
  CryptoOffRampInput,
  CryptoPayinInput,
  CryptoPayinOutput,
  CryptoCurrenciesInput,
  CryptoCurrenciesOutput,
  CryptoPaymentLinkInput,
  CryptoPaymentLinkOutput,

  // Transaction types
  TransactionsInput,
  TransactionsOutput,

  // Refund types
  RefundInput,
  RefundOutput,
} from "@payagency/api";
```

### Important Notes

- **Payment amounts**: Use actual currency amounts (e.g., 100 for $1.00 or £1.00)
- **Crypto amounts**: For crypto, use string format for precise decimal values (e.g., "0.01" for Bitcoin)
- **Country codes**: Use ISO 3166-1 alpha-2 country codes (e.g., "GB", "US")
- **Currency codes**: Use ISO 4217 currency codes (e.g., "USD", "GBP", "EUR")
- **Crypto networks**: Use uppercase format (e.g., "BITCOIN", "ETHEREUM")
- **Card expiry years**: Use full 4-digit format (e.g., "2027", not "27")
- **Optional fields**: Fields marked as optional can be omitted from the payload


## License

MIT License - see the LICENSE file for details.

## Support

For support and documentation, please visit [PayAgency Documentation](https://docs.pay.agency) or contact support@pay.agency

---

**Version**: 1.0.0

**Author**: PaneruVipin

**Repository**: [vp-payomatix/payagency-npm](https://github.com/vp-payomatix/payagency-npm)

