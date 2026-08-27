/**
 * Flash Sale Voucher Types
 * Type definitions for flash sale vouchers based on shared-constants
 * @module FlashSaleVoucherTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales voucher
// ============================================================
import {
  // Voucher Core
  FLASH_SALE_VOUCHER,
  FlashSaleVoucherType,
  FlashSaleVoucherCategory,
  FlashSaleVoucherDenomination,
  FlashSaleVoucherValueType,
  FlashSaleVoucherRedemption,
  FlashSaleVoucherExpiry,
  FlashSaleVoucherTransfer,
  flashsalesVoucherGetTypeLabel,
  flashsalesVoucherGetCategoryLabel,
  flashsalesVoucherGetDenominationLabel,
  flashsalesVoucherGetValueTypeLabel,
  flashsalesVoucherGetRedemptionLabel,
  flashsalesVoucherGetExpiryLabel,
  flashsalesVoucherGetTransferLabel,
  flashsalesVoucherIsValidType,
  flashsalesVoucherIsValidCategory,
  flashsalesVoucherGetDefaultDenomination,
  flashsalesVoucherGetDefaultValidityDays,
  flashsalesVoucherGetDefaultCodeLength,
  flashsalesVoucherGetMaxValue,
  flashsalesVoucherGetMinValue,
  flashsalesVoucherGetMaxRedemptions,
  flashsalesVoucherGetMaxCodeLength,
  flashsalesVoucherGetMinCodeLength,
  flashsalesVoucherGetMaxBulkGeneration,
  flashsalesVoucherGenerateRandomCode,
  // Voucher Type
  FLASH_SALE_VOUCHER_TYPE,
  FlashSaleVoucherTypeCategory,
  FlashSaleVoucherTypeComplexity,
  FlashSaleVoucherTypeScope,
  FlashSaleVoucherTypeFrequency,
  FlashSaleVoucherTypeTrigger,
  FlashSaleVoucherTypeUsage,
  FlashSaleVoucherTypePriority,
  flashsalesVoucherTypeGetCategoryLabel,
  flashsalesVoucherTypeGetComplexityLabel,
  flashsalesVoucherTypeGetScopeLabel,
  flashsalesVoucherTypeGetFrequencyLabel,
  flashsalesVoucherTypeGetTriggerLabel,
  flashsalesVoucherTypeGetUsageLabel,
  flashsalesVoucherTypeGetPriorityLabel,
  flashsalesVoucherTypeIsValidCategory,
  flashsalesVoucherTypeIsValidScope,
  flashsalesVoucherTypeIsValidTrigger,
  flashsalesVoucherTypeIsRecurring,
  flashsalesVoucherTypeIsOneTime,
  flashsalesVoucherTypeIsHighPriority,
  // Voucher Status
  FLASH_SALE_VOUCHER_STATUS,
  FlashSaleVoucherStatusType,
  FlashSaleVoucherStatusCategory,
  FlashSaleVoucherStatusColor,
  FlashSaleVoucherStatusPriority,
  FlashSaleVoucherAvailability,
  flashsalesVoucherStatusGetLabel,
  flashsalesVoucherStatusGetCategory,
  flashsalesVoucherStatusGetColor,
  flashsalesVoucherStatusGetPriority,
  flashsalesVoucherStatusIsActive,
  flashsalesVoucherStatusIsAvailable,
  flashsalesVoucherStatusIsRedeemed,
  flashsalesVoucherStatusIsTerminated,
  flashsalesVoucherStatusCanTransitionTo,
  flashsalesVoucherStatusGetAvailableTransitions,
  flashsalesVoucherStatusCanApprove,
  flashsalesVoucherStatusCanReject,
  flashsalesVoucherStatusCanSchedule,
  flashsalesVoucherStatusCanActivate,
  flashsalesVoucherStatusCanPause,
  flashsalesVoucherStatusCanResume,
  flashsalesVoucherStatusCanRedeem,
  flashsalesVoucherStatusCanPartialRedeem,
  flashsalesVoucherStatusCanComplete,
  flashsalesVoucherStatusCanExpire,
  flashsalesVoucherStatusCanCancel,
  flashsalesVoucherStatusCanDelete,
  flashsalesVoucherStatusGetAvailabilityLabel,
  flashsalesVoucherStatusIsValid,
  flashsalesVoucherStatusIsValidAvailability,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Voucher Extended Types
// ============================================================

/**
 * Flash Sale Voucher
 */
export interface FlashSaleVoucher extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  code: string;
  type: FlashSaleVoucherType;
  category: FlashSaleVoucherCategory;
  denomination: FlashSaleVoucherDenomination;
  valueType: FlashSaleVoucherValueType;
  redemption: FlashSaleVoucherRedemption;
  expiry: FlashSaleVoucherExpiry;
  transfer: FlashSaleVoucherTransfer;
  status: FlashSaleVoucherStatusType;
  availability: FlashSaleVoucherAvailability;
  value: number;
  minValue: number;
  maxValue: number;
  maxRedemptions: number;
  redeemedCount: number;
  validityDays: number;
  isActive: boolean;
  isAvailable: boolean;
  isRedeemed: boolean;
  isTerminated: boolean;
  isRecurring: boolean;
  isOneTime: boolean;
  isHighPriority: boolean;
  startsAt: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Voucher Filter
 */
export interface FlashSaleVoucherFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  codes?: string[];
  types?: FlashSaleVoucherType[];
  categories?: FlashSaleVoucherCategory[];
  denominations?: FlashSaleVoucherDenomination[];
  valueTypes?: FlashSaleVoucherValueType[];
  redemptions?: FlashSaleVoucherRedemption[];
  expiries?: FlashSaleVoucherExpiry[];
  transfers?: FlashSaleVoucherTransfer[];
  statuses?: FlashSaleVoucherStatusType[];
  availabilities?: FlashSaleVoucherAvailability[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isAvailable?: boolean;
  isRedeemed?: boolean;
  isTerminated?: boolean;
  isRecurring?: boolean;
  isOneTime?: boolean;
  isHighPriority?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Flash Sale Voucher Statistics
 */
export interface FlashSaleVoucherStatistics {
  flashSaleId: ID;
  totalVouchers: number;
  activeVouchers: number;
  availableVouchers: number;
  redeemedVouchers: number;
  terminatedVouchers: number;
  recurringVouchers: number;
  oneTimeVouchers: number;
  highPriorityVouchers: number;
  byType: Record<FlashSaleVoucherType, number>;
  byCategory: Record<FlashSaleVoucherCategory, number>;
  byStatus: Record<FlashSaleVoucherStatusType, number>;
  byDenomination: Record<FlashSaleVoucherDenomination, number>;
  byValueType: Record<FlashSaleVoucherValueType, number>;
  byRedemption: Record<FlashSaleVoucherRedemption, number>;
  byExpiry: Record<FlashSaleVoucherExpiry, number>;
  byTransfer: Record<FlashSaleVoucherTransfer, number>;
  byAvailability: Record<FlashSaleVoucherAvailability, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalValue: number;
  averageValue: number;
  maxValue: number;
  minValue: number;
  totalRedemptions: number;
  averageRedemptions: number;
  maxRedemptions: number;
  minRedemptions: number;
  mostFrequentType: FlashSaleVoucherType;
  mostFrequentCategory: FlashSaleVoucherCategory;
  mostFrequentStatus: FlashSaleVoucherStatusType;
}

/**
 * Flash Sale Voucher Summary
 */
export interface FlashSaleVoucherSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalVouchers: number;
  active: number;
  available: number;
  redeemed: number;
  terminated: number;
  recurring: number;
  oneTime: number;
  highPriority: number;
  byType: Record<FlashSaleVoucherType, number>;
  byCategory: Record<FlashSaleVoucherCategory, number>;
  byStatus: Record<FlashSaleVoucherStatusType, number>;
  byDenomination: Record<FlashSaleVoucherDenomination, number>;
  byValueType: Record<FlashSaleVoucherValueType, number>;
  byRedemption: Record<FlashSaleVoucherRedemption, number>;
  byExpiry: Record<FlashSaleVoucherExpiry, number>;
  byTransfer: Record<FlashSaleVoucherTransfer, number>;
  byAvailability: Record<FlashSaleVoucherAvailability, number>;
  voucherTrend: {
    date: Date;
    total: number;
    active: number;
    available: number;
  }[];
  topTypes: {
    type: FlashSaleVoucherType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: FlashSaleVoucherCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleVoucherStatusType;
    count: number;
    label: string;
  }[];
  valueMetrics: {
    totalValue: number;
    averageValue: number;
    maxValue: number;
    minValue: number;
    totalRedemptions: number;
    averageRedemptions: number;
  };
}

/**
 * Flash Sale Voucher Configuration
 */
export interface FlashSaleVoucherConfiguration {
  enabled: boolean;
  defaultType: FlashSaleVoucherType;
  defaultCategory: FlashSaleVoucherCategory;
  defaultDenomination: FlashSaleVoucherDenomination;
  defaultValueType: FlashSaleVoucherValueType;
  defaultRedemption: FlashSaleVoucherRedemption;
  defaultExpiry: FlashSaleVoucherExpiry;
  defaultTransfer: FlashSaleVoucherTransfer;
  defaultStatus: FlashSaleVoucherStatusType;
  defaultValidityDays: number;
  defaultCodeLength: number;
  maxValue: number;
  minValue: number;
  maxRedemptions: number;
  maxCodeLength: number;
  minCodeLength: number;
  maxBulkGeneration: number;
  requireApproval: boolean;
  allowRecurring: boolean;
  allowOneTime: boolean;
  allowHighPriority: boolean;
  allowTransfer: boolean;
  allowPartialRedemption: boolean;
  autoGenerateCode: boolean;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnSchedule: boolean;
  notificationOnActivate: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnRedeem: boolean;
  notificationOnPartialRedeem: boolean;
  notificationOnComplete: boolean;
  notificationOnExpire: boolean;
  notificationOnCancel: boolean;
  notificationOnDelete: boolean;
  alertConfig?: FlashSaleVoucherAlertConfig;
}

/**
 * Flash Sale Voucher Alert Configuration
 */
export interface FlashSaleVoucherAlertConfig {
  enabled: boolean;
  highRedemptionAlert: boolean;
  highRedemptionThreshold: number;
  lowRedemptionAlert: boolean;
  lowRedemptionThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  valueThresholdAlert: boolean;
  valueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Voucher History
 */
export interface FlashSaleVoucherHistory extends BaseEntity, Timestamp {
  id: ID;
  voucherId: ID;
  flashSaleId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'schedule'
    | 'activate'
    | 'pause'
    | 'resume'
    | 'redeem'
    | 'partial_redeem'
    | 'complete'
    | 'expire'
    | 'cancel'
    | 'delete'
    | 'restore'
    | 'transfer'
    | 'bulk_generate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Voucher Validation
 */
export interface FlashSaleVoucherValidation {
  isValid: boolean;
  voucherId: ID;
  flashSaleId: ID;
  code: string;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Voucher Export
 */
export interface FlashSaleVoucherExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleVoucherFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Voucher Redemption
 */
export interface FlashSaleVoucherRedemptionRecord extends BaseEntity, Timestamp {
  id: ID;
  voucherId: ID;
  flashSaleId: ID;
  userId: ID;
  orderId: ID;
  amount: number;
  isPartial: boolean;
  remainingValue?: number;
  metadata?: Metadata;
}

/**
 * Flash Sale Voucher Transfer
 */
export interface FlashSaleVoucherTransferRecord extends BaseEntity, Timestamp {
  id: ID;
  voucherId: ID;
  flashSaleId: ID;
  fromUserId: ID;
  toUserId: ID;
  transferredAt: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Voucher Bulk Generation
 */
export interface FlashSaleVoucherBulkGeneration extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  count: number;
  codes: string[];
  type: FlashSaleVoucherType;
  category: FlashSaleVoucherCategory;
  denomination: FlashSaleVoucherDenomination;
  valueType: FlashSaleVoucherValueType;
  value: number;
  validityDays: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Voucher Core
  FLASH_SALE_VOUCHER,
  FlashSaleVoucherType,
  FlashSaleVoucherCategory,
  FlashSaleVoucherDenomination,
  FlashSaleVoucherValueType,
  FlashSaleVoucherRedemption,
  FlashSaleVoucherExpiry,
  FlashSaleVoucherTransfer,
  flashsalesVoucherGetTypeLabel,
  flashsalesVoucherGetCategoryLabel,
  flashsalesVoucherGetDenominationLabel,
  flashsalesVoucherGetValueTypeLabel,
  flashsalesVoucherGetRedemptionLabel,
  flashsalesVoucherGetExpiryLabel,
  flashsalesVoucherGetTransferLabel,
  flashsalesVoucherIsValidType,
  flashsalesVoucherIsValidCategory,
  flashsalesVoucherGetDefaultDenomination,
  flashsalesVoucherGetDefaultValidityDays,
  flashsalesVoucherGetDefaultCodeLength,
  flashsalesVoucherGetMaxValue,
  flashsalesVoucherGetMinValue,
  flashsalesVoucherGetMaxRedemptions,
  flashsalesVoucherGetMaxCodeLength,
  flashsalesVoucherGetMinCodeLength,
  flashsalesVoucherGetMaxBulkGeneration,
  flashsalesVoucherGenerateRandomCode,
  // Voucher Type
  FLASH_SALE_VOUCHER_TYPE,
  FlashSaleVoucherTypeCategory,
  FlashSaleVoucherTypeComplexity,
  FlashSaleVoucherTypeScope,
  FlashSaleVoucherTypeFrequency,
  FlashSaleVoucherTypeTrigger,
  FlashSaleVoucherTypeUsage,
  FlashSaleVoucherTypePriority,
  flashsalesVoucherTypeGetCategoryLabel,
  flashsalesVoucherTypeGetComplexityLabel,
  flashsalesVoucherTypeGetScopeLabel,
  flashsalesVoucherTypeGetFrequencyLabel,
  flashsalesVoucherTypeGetTriggerLabel,
  flashsalesVoucherTypeGetUsageLabel,
  flashsalesVoucherTypeGetPriorityLabel,
  flashsalesVoucherTypeIsValidCategory,
  flashsalesVoucherTypeIsValidScope,
  flashsalesVoucherTypeIsValidTrigger,
  flashsalesVoucherTypeIsRecurring,
  flashsalesVoucherTypeIsOneTime,
  flashsalesVoucherTypeIsHighPriority,
  // Voucher Status
  FLASH_SALE_VOUCHER_STATUS,
  FlashSaleVoucherStatusType,
  FlashSaleVoucherStatusCategory,
  FlashSaleVoucherStatusColor,
  FlashSaleVoucherStatusPriority,
  FlashSaleVoucherAvailability,
  flashsalesVoucherStatusGetLabel,
  flashsalesVoucherStatusGetCategory,
  flashsalesVoucherStatusGetColor,
  flashsalesVoucherStatusGetPriority,
  flashsalesVoucherStatusIsActive,
  flashsalesVoucherStatusIsAvailable,
  flashsalesVoucherStatusIsRedeemed,
  flashsalesVoucherStatusIsTerminated,
  flashsalesVoucherStatusCanTransitionTo,
  flashsalesVoucherStatusGetAvailableTransitions,
  flashsalesVoucherStatusCanApprove,
  flashsalesVoucherStatusCanReject,
  flashsalesVoucherStatusCanSchedule,
  flashsalesVoucherStatusCanActivate,
  flashsalesVoucherStatusCanPause,
  flashsalesVoucherStatusCanResume,
  flashsalesVoucherStatusCanRedeem,
  flashsalesVoucherStatusCanPartialRedeem,
  flashsalesVoucherStatusCanComplete,
  flashsalesVoucherStatusCanExpire,
  flashsalesVoucherStatusCanCancel,
  flashsalesVoucherStatusCanDelete,
  flashsalesVoucherStatusGetAvailabilityLabel,
  flashsalesVoucherStatusIsValid,
  flashsalesVoucherStatusIsValidAvailability,
};
