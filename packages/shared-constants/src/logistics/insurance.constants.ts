import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CURRENCY } from '../common/currency.constants';

export const INSURANCE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    CLAIMED: 'claimed',
    SETTLED: 'settled',
    REJECTED: 'rejected',
  },
  TYPES: {
    ...COMMON_TYPES,
    SHIPMENT: 'shipment',
    CARGO: 'cargo',
    LIABILITY: 'liability',
    COMPREHENSIVE: 'comprehensive',
  },
  CURRENCY: { ...CURRENCY },
  INSURANCE_PROVIDERS: ['Sadharana Bima', 'Jibon Bima', 'Green Delta', 'Pioneer', 'Reliance'],
  COVERAGE_PERCENTAGE: {
    BASIC: 0.5,
    STANDARD: 0.75,
    PREMIUM: 1.0,
    COMPREHENSIVE: 1.5,
  },
  MIN_INSURANCE_AMOUNT: 100,
  MAX_INSURANCE_AMOUNT: 1000000,
  CLAIM_WINDOW_DAYS: 30,
} as const;
