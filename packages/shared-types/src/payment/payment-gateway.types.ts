/**
 * Payment Gateway Types
 * Type definitions for payment gateways based on shared-constants
 * @module PaymentGatewayTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Gateway
  PAYMENT_GATEWAY,
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  PaymentGatewayCurrency,
  PaymentGatewayFee,
  PaymentGatewayDefault,
  PaymentGatewayLimit,
  paymentgatewayGetGatewayLabel,
  paymentgatewayGetCategoryLabel,
  paymentgatewayGetStatusLabel,
  paymentgatewayGetCurrencyLabel,
  paymentgatewayGetFee,
  paymentgatewayIsActive,
  paymentgatewayIsMaintenance,
  paymentgatewayGetDefaultGateway,
  paymentgatewayGetDefaultCurrency,
} from '@vubon/shared-constants';

// ============================================================
// Payment Gateway Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Payment gateway filter
 */
export interface PaymentGatewayFilter {
  ids?: ID[];
  types?: PaymentGatewayType[];
  categories?: PaymentGatewayCategory[];
  statuses?: PaymentGatewayStatus[];
  currencies?: PaymentGatewayCurrency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isMaintenance?: boolean;
  minFee?: number;
  maxFee?: number;
  searchTerm?: string;
}

/**
 * Payment gateway statistics
 */
export interface PaymentGatewayStatistics {
  totalGateways: number;
  activeGateways: number;
  maintenanceGateways: number;
  byType: Record<PaymentGatewayType, number>;
  byCategory: Record<PaymentGatewayCategory, number>;
  byStatus: Record<PaymentGatewayStatus, number>;
  byCurrency: Record<PaymentGatewayCurrency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFee: number;
  maxFee: number;
  minFee: number;
  mostFrequentType: PaymentGatewayType;
  mostFrequentCategory: PaymentGatewayCategory;
  mostFrequentStatus: PaymentGatewayStatus;
  mostFrequentCurrency: PaymentGatewayCurrency;
}

/**
 * Payment gateway summary
 */
export interface PaymentGatewaySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalGateways: number;
  active: number;
  maintenance: number;
  byType: Record<PaymentGatewayType, number>;
  byCategory: Record<PaymentGatewayCategory, number>;
  byStatus: Record<PaymentGatewayStatus, number>;
  byCurrency: Record<PaymentGatewayCurrency, number>;
  gatewayTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: PaymentGatewayType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: PaymentGatewayCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: PaymentGatewayStatus;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: PaymentGatewayCurrency;
    count: number;
    label: string;
  }[];
}

/**
 * Payment gateway configuration
 */
export interface PaymentGatewayConfiguration {
  enabled: boolean;
  defaultGateway: PaymentGatewayType;
  defaultCurrency: PaymentGatewayCurrency;
  allowMultipleGateways: boolean;
  autoSelectBestGateway: boolean;
  gatewaySelectionStrategy: 'cost' | 'success_rate' | 'speed' | 'preference';
  requireVerification: boolean;
  maxGatewaysPerUser: number;
  notificationOnAdd: boolean;
  notificationOnRemove: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: PaymentGatewayAlertConfig;
}

/**
 * Payment gateway alert configuration
 */
export interface PaymentGatewayAlertConfig {
  enabled: boolean;
  statusChangeAlert: boolean;
  feeChangeAlert: boolean;
  maintenanceAlert: boolean;
  failureRateAlert: boolean;
  failureRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Payment gateway history
 */
export interface PaymentGatewayHistory extends BaseEntity, Timestamp {
  id: ID;
  gatewayId: ID;
  action:
    'add' | 'update' | 'activate' | 'deactivate' | 'maintenance' | 'config_change' | 'fee_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Payment gateway validation
 */
export interface PaymentGatewayValidation {
  isValid: boolean;
  gatewayId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Payment gateway transaction
 */
export interface PaymentGatewayTransaction extends BaseEntity, Timestamp {
  id: ID;
  gatewayId: ID;
  transactionId: string;
  amount: number;
  currency: PaymentGatewayCurrency;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  fee: number;
  feeCurrency: PaymentGatewayCurrency;
  gatewayReference?: string;
  metadata?: Metadata;
}

/**
 * Payment gateway export
 */
export interface PaymentGatewayExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PaymentGatewayFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Payment Gateway
  PAYMENT_GATEWAY,
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  PaymentGatewayCurrency,
  PaymentGatewayFee,
  PaymentGatewayDefault,
  PaymentGatewayLimit,
  paymentgatewayGetGatewayLabel,
  paymentgatewayGetCategoryLabel,
  paymentgatewayGetStatusLabel,
  paymentgatewayGetCurrencyLabel,
  paymentgatewayGetFee,
  paymentgatewayIsActive,
  paymentgatewayIsMaintenance,
  paymentgatewayGetDefaultGateway,
  paymentgatewayGetDefaultCurrency,
};
