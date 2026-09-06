/**
 * Bank Transfer Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/bank-transfer.constants
 */

import { TYPES } from '../../common/types.constants';

export const BANK_TRANSFER = {
  // Base types from common
  ...TYPES,

  // Bank transfer specific
  DEFAULT_CURRENCY: 'BDT',
  BANK_TRANSFER_CACHE_TTL: 3600,
  MAX_TRANSFER_AMOUNT: 99999999.99,
  MIN_TRANSFER_AMOUNT: 1,

  // Bank transfer status
  BANK_TRANSFER_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REJECTED: 'rejected',
    ON_HOLD: 'on_hold',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
  } as const,

  // Bank transfer type
  BANK_TRANSFER_TYPE: {
    LOCAL: 'local',
    INTERNATIONAL: 'international',
    SWIFT: 'swift',
    ACH: 'ach',
    WIRE: 'wire',
    RTGS: 'rtgs',
    NEFT: 'neft',
  } as const,

  // Bank account type
  BANK_ACCOUNT_TYPE: {
    SAVINGS: 'savings',
    CURRENT: 'current',
    FIXED_DEPOSIT: 'fixed_deposit',
    RECURRING_DEPOSIT: 'recurring_deposit',
    JOINT: 'joint',
    CORPORATE: 'corporate',
  } as const,

  // Bank validation
  BANK_TRANSFER_VALIDATION: {
    REQUIRES_ACCOUNT_NUMBER: true,
    REQUIRES_IFSC: false,
    REQUIRES_SWIFT: false,
    REQUIRES_IBAN: false,
    REQUIRES_ROUTING_NUMBER: false,
  } as const,
} as const;

export type BankTransferStatus =
  (typeof BANK_TRANSFER.BANK_TRANSFER_STATUS)[keyof typeof BANK_TRANSFER.BANK_TRANSFER_STATUS];
export type BankTransferType =
  (typeof BANK_TRANSFER.BANK_TRANSFER_TYPE)[keyof typeof BANK_TRANSFER.BANK_TRANSFER_TYPE];
export type BankAccountType =
  (typeof BANK_TRANSFER.BANK_ACCOUNT_TYPE)[keyof typeof BANK_TRANSFER.BANK_ACCOUNT_TYPE];

export const BANK_TRANSFER_STATUS_LABELS: Record<BankTransferStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
  on_hold: 'On Hold',
  verified: 'Verified',
  unverified: 'Unverified',
};

export const BANK_TRANSFER_STATUS_COLORS: Record<BankTransferStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  rejected: '#ef4444',
  on_hold: '#f59e0b',
  verified: '#22c55e',
  unverified: '#f59e0b',
};
