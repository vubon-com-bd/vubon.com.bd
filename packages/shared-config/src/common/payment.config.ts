/**
 * Payment Configuration
 * পেমেন্ট কনফিগারেশন
 */
export interface PaymentConfig {
  enabled: boolean;
  defaultCurrency: string;
  methods: {
    sslcommerz: boolean;
    bkash: boolean;
    nagad: boolean;
    rocket: boolean;
    stripe: boolean;
    paypal: boolean;
    bankTransfer: boolean;
  };
  transaction: {
    timeout: number;
    maxAmount: number;
    minAmount: number;
    dailyLimit: number;
    monthlyLimit: number;
  };
  webhook: {
    enabled: boolean;
    secret: string;
    url: string;
  };
  refund: {
    enabled: boolean;
    maxDays: number;
    autoApproval: boolean;
  };
}

export const createPaymentConfig = (): PaymentConfig => ({
  enabled: true,
  defaultCurrency: 'BDT',
  methods: {
    sslcommerz: true,
    bkash: true,
    nagad: true,
    rocket: true,
    stripe: false,
    paypal: false,
    bankTransfer: true,
  },
  transaction: {
    timeout: 30 * 60 * 1000, // 30 minutes
    maxAmount: 1000000,
    minAmount: 1,
    dailyLimit: 1000000,
    monthlyLimit: 10000000,
  },
  webhook: {
    enabled: true,
    secret: process.env.PAYMENT_WEBHOOK_SECRET || 'webhook-secret-key',
    url: process.env.PAYMENT_WEBHOOK_URL || 'http://localhost:3000/api/webhooks/payment',
  },
  refund: {
    enabled: true,
    maxDays: 30,
    autoApproval: false,
  },
});
