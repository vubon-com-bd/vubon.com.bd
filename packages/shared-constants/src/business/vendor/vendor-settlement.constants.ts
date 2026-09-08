import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { VENDOR_PAYOUT } from './vendor-payout.constants';

export const VENDOR_SETTLEMENT = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    SETTLED: 'settled',
    FAILED: 'failed',
    PARTIAL: 'partial',
  },
  VENDOR_PAYOUT: { ...VENDOR_PAYOUT },
  SETTLEMENT_TYPES: {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
    ON_DEMAND: 'on_demand',
  },
  SETTLEMENT_CYCLE_DAYS: 15,
  MIN_SETTLEMENT_AMOUNT: 50,
  MAX_SETTLEMENT_AMOUNT: 1000000,
} as const;
