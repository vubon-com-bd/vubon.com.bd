/**
 * Module test fixtures
 * @module test/fixtures/modules
 */

export const TEST_ENV = {
  NODE_ENV: 'test',
  DISABLE_AUTH: 'true',
  PRISMA_SKIP_ENGINE_BOOTSTRAP: 'true',
  JWT_SECRET: 'test-secret-key-minimum-32-characters-long',
} as const;

export function setTestEnv(): void {
  for (const [k, v] of Object.entries(TEST_ENV)) {
    process.env[k] = v;
  }
}

export const EXPECTED_HANDLER_COUNTS = {
  payment: { commands: 5, queries: 4, sagas: 1 },
  'payment-method': { commands: 4, queries: 2, sagas: 0 },
  'payment-gateway': { commands: 0, queries: 2, sagas: 0 },
  transaction: { commands: 2, queries: 2, sagas: 0 },
  refund: { commands: 4, queries: 2, sagas: 1 },
  'split-payment': { commands: 1, queries: 0, sagas: 0 },
  'recurring-payment': { commands: 3, queries: 0, sagas: 0 },
  subscription: { commands: 5, queries: 2, sagas: 1 },
  invoice: { commands: 3, queries: 2, sagas: 0 },
  webhook: { commands: 4, queries: 0, sagas: 0 },
} as const;

export const EXPECTED_SERVICE_TOKENS = [
  'PAYMENT_SERVICE',
  'PAYMENT_METHOD_SERVICE',
  'PAYMENT_GATEWAY_SERVICE',
  'TRANSACTION_SERVICE',
  'REFUND_SERVICE',
  'SPLIT_PAYMENT_SERVICE',
  'RECURRING_PAYMENT_SERVICE',
  'SUBSCRIPTION_SERVICE',
  'INVOICE_SERVICE',
  'VERIFICATION_SERVICE',
] as const;

export const EXPECTED_GATEWAY_WRAPPERS = [
  'BkashModule',
  'NagadModule',
  'RocketModule',
  'StripeModule',
  'PaypalModule',
  'SslcommerzModule',
  'AamarpayModule',
  'CodModule',
  'CryptoModule',
] as const;
