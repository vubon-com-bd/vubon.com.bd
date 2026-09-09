export const paymentConfig = {
  defaultCurrency: 'BDT',
  minAmount: 1,
  maxAmount: 9999999,
  timeout: 15 * 60, // 15 minutes
  retryAttempts: 3,
  retryDelay: 60, // 60 seconds
  testMode: process.env.NODE_ENV !== 'production',
};
