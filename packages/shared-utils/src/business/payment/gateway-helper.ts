/**
 * Gateway Helper
 * গেটওয়ে হেল্পার
 */

import { PAYMENT_GATEWAYS } from '@vubon/shared-constants';
import type { PaymentGateway } from '@vubon/shared-types';

export interface GatewayConfig {
  apiKey?: string;
  apiSecret?: string;
  merchantId?: string;
  storeId?: string;
  storePassword?: string;
  sandbox: boolean;
  webhookUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
  ipnUrl?: string;
}

export interface GatewayCredentials {
  gateway: string;
  config: GatewayConfig;
}

export const getGatewayConfig = (
  gatewayCode: string,
  configs: Record<string, GatewayConfig>
): GatewayConfig | null => {
  return configs[gatewayCode] || null;
};

export const getGatewayCredentials = (
  gatewayCode: string,
  credentials: Record<string, GatewayCredentials>
): GatewayCredentials | null => {
  return credentials[gatewayCode] || null;
};

export const getGatewayMethods = (gatewayCode: string): string[] => {
  const methods: Record<string, string[]> = {
    sslcommerz: ['credit_card', 'debit_card', 'bank_transfer', 'mobile_banking'],
    bkash: ['mobile_banking'],
    nagad: ['mobile_banking'],
    rocket: ['mobile_banking'],
    stripe: ['credit_card', 'debit_card'],
    paypal: ['paypal', 'credit_card'],
  };

  return methods[gatewayCode] || [];
};

export const getGatewayCurrencies = (gatewayCode: string): string[] => {
  const currencies: Record<string, string[]> = {
    sslcommerz: ['BDT'],
    bkash: ['BDT'],
    nagad: ['BDT'],
    rocket: ['BDT'],
    stripe: ['USD', 'EUR', 'GBP', 'BDT'],
    paypal: ['USD', 'EUR', 'GBP', 'BDT'],
  };

  return currencies[gatewayCode] || ['BDT'];
};

export const getGatewayName = (gatewayCode: string): string => {
  const names: Record<string, string> = {
    sslcommerz: 'SSLCommerz',
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    stripe: 'Stripe',
    paypal: 'PayPal',
  };

  return names[gatewayCode] || gatewayCode;
};

export const isGatewaySandbox = (
  gatewayCode: string,
  configs: Record<string, GatewayConfig>
): boolean => {
  const config = getGatewayConfig(gatewayCode, configs);
  return config?.sandbox || false;
};

export const getGatewayWebhookUrl = (
  gatewayCode: string,
  configs: Record<string, GatewayConfig>
): string | null => {
  const config = getGatewayConfig(gatewayCode, configs);
  return config?.webhookUrl || null;
};

export const getGatewaySuccessUrl = (
  gatewayCode: string,
  configs: Record<string, GatewayConfig>
): string | null => {
  const config = getGatewayConfig(gatewayCode, configs);
  return config?.successUrl || null;
};

export const getGatewayCancelUrl = (
  gatewayCode: string,
  configs: Record<string, GatewayConfig>
): string | null => {
  const config = getGatewayConfig(gatewayCode, configs);
  return config?.cancelUrl || null;
};

export const getDefaultGateway = (): string => {
  return 'sslcommerz';
};

export const getSupportedGateways = (): string[] => {
  return Object.values(PAYMENT_GATEWAYS) as string[];
};

// PaymentGateway টাইপ ব্যবহার করে গেটওয়ে অবজেক্ট তৈরি
export const createPaymentGateway = (
  gatewayCode: string,
  config: GatewayConfig
): Omit<PaymentGateway, 'id' | 'createdAt' | 'updatedAt'> => {
  return {
    name: getGatewayName(gatewayCode),
    nameBangla: getGatewayName(gatewayCode),
    code: gatewayCode as (typeof PAYMENT_GATEWAYS)[keyof typeof PAYMENT_GATEWAYS],
    description: `${getGatewayName(gatewayCode)} payment gateway`,
    isActive: true,
    isSandbox: config.sandbox,
    config: config as unknown as Record<string, string | number | boolean | object>,
    supportedCurrencies: getGatewayCurrencies(gatewayCode),
    supportedMethods: getGatewayMethods(gatewayCode),
    feePercentage: 2.5,
    feeFixed: 0,
    minAmount: 10,
    maxAmount: 99999999,
    processingTime: 24,
    webhookUrl: config.webhookUrl,
    successUrl: config.successUrl,
    cancelUrl: config.cancelUrl,
    deletedAt: null,
  };
};

// Gateway status check
export const isGatewayActive = (gatewayCode: string, gateways: PaymentGateway[]): boolean => {
  const gateway = gateways.find((g) => g.code === gatewayCode);
  return gateway?.isActive || false;
};

// Gateway fee calculation
export const calculateGatewayFee = (
  amount: number,
  gatewayCode: string,
  gateways: PaymentGateway[]
): {
  fee: number;
  netAmount: number;
} => {
  const gateway = gateways.find((g) => g.code === gatewayCode);
  if (!gateway) {
    return {
      fee: 0,
      netAmount: amount,
    };
  }

  const fee = (amount * gateway.feePercentage) / 100 + gateway.feeFixed;
  return {
    fee: Math.round(fee * 100) / 100,
    netAmount: Math.round((amount - fee) * 100) / 100,
  };
};
