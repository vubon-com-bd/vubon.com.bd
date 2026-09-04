/**
 * Payment Gateway Types
 * পেমেন্ট গেটওয়ে সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { PAYMENT_GATEWAYS } from '@vubon/shared-constants';

export interface PaymentGateway extends BaseEntity {
  name: string;
  nameBangla?: string;
  code: (typeof PAYMENT_GATEWAYS)[keyof typeof PAYMENT_GATEWAYS];
  description?: string;
  isActive: boolean;
  isSandbox: boolean;
  config: Record<string, string | number | boolean | object>;
  supportedCurrencies: string[];
  supportedMethods: string[];
  feePercentage: number;
  feeFixed: number;
  minAmount: number;
  maxAmount: number;
  processingTime: number;
  webhookUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentGatewayCreateInput {
  name: string;
  nameBangla?: string;
  code: (typeof PAYMENT_GATEWAYS)[keyof typeof PAYMENT_GATEWAYS];
  description?: string;
  isSandbox?: boolean;
  config: Record<string, string | number | boolean | object>;
  supportedCurrencies?: string[];
  supportedMethods?: string[];
  feePercentage?: number;
  feeFixed?: number;
  minAmount?: number;
  maxAmount?: number;
  processingTime?: number;
  webhookUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface PaymentGatewayUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  isActive?: boolean;
  config?: Record<string, string | number | boolean | object>;
  feePercentage?: number;
  feeFixed?: number;
  minAmount?: number;
  maxAmount?: number;
  processingTime?: number;
  webhookUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface PaymentGatewayResponse {
  paymentGateway: PaymentGateway;
}
