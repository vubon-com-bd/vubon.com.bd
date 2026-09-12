import { COMMISSION } from '@vubon/shared-constants/src/common/commission.constants';

export const payoutConfig = {
  minAmount: 100,
  maxAmount: 500_000,
  frequencies: Object.values(COMMISSION.PAYOUT_SCHEDULE),
  defaultFrequency: COMMISSION.PAYOUT_SCHEDULE.WEEKLY,
  processingDays: 3,
  holdPeriodDays: 7,
  methods: ['bank_transfer', 'bkash', 'nagad', 'rocket'] as const,
} as const;
