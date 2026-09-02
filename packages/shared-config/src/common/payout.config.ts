/**
 * Payout Configuration
 * পেআউট কনফিগারেশন
 */
export interface PayoutConfig {
  enabled: boolean;
  methods: {
    bankTransfer: boolean;
    bkash: boolean;
    nagad: boolean;
    rocket: boolean;
    wallet: boolean;
  };
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    dayOfWeek: number;
    dayOfMonth: number;
    time: string;
  };
  limits: {
    minAmount: number;
    maxAmount: number;
    dailyLimit: number;
    weeklyLimit: number;
    monthlyLimit: number;
  };
  approval: {
    required: boolean;
    autoApproveBelow: number;
    maxAmount: number;
  };
  processing: {
    days: number;
    fee: number;
    feeType: 'percentage' | 'fixed';
  };
}

export const createPayoutConfig = (): PayoutConfig => ({
  enabled: true,
  methods: {
    bankTransfer: true,
    bkash: true,
    nagad: true,
    rocket: true,
    wallet: true,
  },
  schedule: {
    frequency: 'weekly',
    dayOfWeek: 1,
    dayOfMonth: 1,
    time: '09:00',
  },
  limits: {
    minAmount: 500,
    maxAmount: 500000,
    dailyLimit: 500000,
    weeklyLimit: 1000000,
    monthlyLimit: 5000000,
  },
  approval: {
    required: true,
    autoApproveBelow: 10000,
    maxAmount: 500000,
  },
  processing: {
    days: 3,
    fee: 0,
    feeType: 'percentage',
  },
});
