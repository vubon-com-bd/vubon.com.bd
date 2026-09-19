/**
 * Payment Gateway Value Types
 * @module shared-types/business/payment
 *
 * Values আসে shared-constants/business/payment/payment-gateway.constants থেকে।
 */

import type {
  PAYMENT_GATEWAY,
  PAYMENT_GATEWAY_STATUS,
  PAYMENT_GATEWAY_ENV,
} from '@vubon/shared-constants/business';

export type PaymentGatewayValue = (typeof PAYMENT_GATEWAY)[keyof typeof PAYMENT_GATEWAY];

export type PaymentGatewayStatusValue =
  (typeof PAYMENT_GATEWAY_STATUS)[keyof typeof PAYMENT_GATEWAY_STATUS];

export type PaymentGatewayEnvValue = (typeof PAYMENT_GATEWAY_ENV)[keyof typeof PAYMENT_GATEWAY_ENV];

export interface PaymentGatewayMetadata {
  readonly value: PaymentGatewayValue;
  readonly label: string;
  readonly status: PaymentGatewayStatusValue;
  readonly env: PaymentGatewayEnvValue;
  readonly isLocal: boolean;
  readonly supportedCurrencies: readonly string[];
}
