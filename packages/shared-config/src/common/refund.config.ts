/**
 * Refund Configuration
 * রিফান্ড কনফিগারেশন
 */
export interface RefundConfig {
  enabled: boolean;
  methods: {
    originalPayment: boolean;
    wallet: boolean;
    bankTransfer: boolean;
  };
  approval: {
    required: boolean;
    autoApproveBelow: number;
    maxAmount: number;
  };
  timeline: {
    processingDays: number;
    maxDays: number;
    coolingPeriod: number;
  };
  fees: {
    processingFee: number;
    cancellationFee: number;
    restockingFee: number;
  };
  restrictions: {
    minAmount: number;
    maxAmount: number;
    maxPerMonth: number;
  };
}

export const createRefundConfig = (): RefundConfig => ({
  enabled: true,
  methods: {
    originalPayment: true,
    wallet: true,
    bankTransfer: true,
  },
  approval: {
    required: false,
    autoApproveBelow: 5000,
    maxAmount: 100000,
  },
  timeline: {
    processingDays: 3,
    maxDays: 30,
    coolingPeriod: 7,
  },
  fees: {
    processingFee: 0,
    cancellationFee: 0,
    restockingFee: 10,
  },
  restrictions: {
    minAmount: 1,
    maxAmount: 1000000,
    maxPerMonth: 5,
  },
});
