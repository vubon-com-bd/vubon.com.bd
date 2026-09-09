import { BaseEntity } from '../../common/base.types';

export interface PaymentSettingsValues {
  enabledGateways: string[];
  defaultGateway: string;
  currency: string;
  minPaymentAmount: number;
  maxPaymentAmount: number;
  paymentTimeout: number;
  retryAttempts: number;
  retryDelay: number;
  enableTestMode: boolean;
  testGateways: string[];
  webhookSecret: string;
  apiVersion: string;
}

export interface PaymentSettings extends BaseEntity {
  settingsId: string;
  key: string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
