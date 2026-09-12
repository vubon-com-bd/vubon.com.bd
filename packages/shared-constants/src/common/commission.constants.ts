/**
 * Commission Constants
 * @module shared-constants/common/commission.constants
 */

export const COMMISSION = {
  // Commission types
  TYPE: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    TIERED: 'tiered',
    HYBRID: 'hybrid', // percentage + fixed
  } as const,

  // Commission basis
  BASIS: {
    PRODUCT_PRICE: 'product_price',
    PRODUCT_COST: 'product_cost',
    PRODUCT_PROFIT: 'product_profit',
    SHIPPING: 'shipping',
    TOTAL_ORDER: 'total_order',
    SUBTOTAL: 'subtotal',
  } as const,

  // Commission frequency
  FREQUENCY: {
    PER_ORDER: 'per_order',
    PER_PRODUCT: 'per_product',
    PER_QUANTITY: 'per_quantity',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
  } as const,

  // Commission status
  COMMISSION_STATUS: {
    PENDING: 'pending',
    CALCULATED: 'calculated',
    APPROVED: 'approved',
    PAID: 'paid',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ADJUSTED: 'adjusted',
  } as const,

  // Payout schedule
  PAYOUT_SCHEDULE: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    MANUAL: 'manual',
  } as const,

  // Commission tiers
  TIER: {
    LEVEL_1: {
      threshold: 0,
      rate: 10, // 10%
      label: 'Standard',
    },
    LEVEL_2: {
      threshold: 10000,
      rate: 12,
      label: 'Silver',
    },
    LEVEL_3: {
      threshold: 50000,
      rate: 15,
      label: 'Gold',
    },
    LEVEL_4: {
      threshold: 100000,
      rate: 18,
      label: 'Platinum',
    },
    LEVEL_5: {
      threshold: 500000,
      rate: 20,
      label: 'Diamond',
    },
  } as const,

  // Default values
  DEFAULT: {
    RATE: 10,
    MIN_AMOUNT: 0,
    MAX_AMOUNT: null,
    THRESHOLD: 0,
    CURRENCY: 'BDT',
  },

  // Calculation settings
  CALCULATION: {
    ROUNDING: 2,
    DECIMALS: 2,
    ROUNDING_MODE: 'round',
  },

  // Seller tiers
  SELLER_TIERS: {
    STANDARD: {
      label: 'Standard',
      commission_rate: 15,
      monthly_fee: 0,
      features: ['basic_listing', 'order_management'],
    },
    PREMIUM: {
      label: 'Premium',
      commission_rate: 12,
      monthly_fee: 500,
      features: ['basic_listing', 'order_management', 'priority_support', 'marketing_tools'],
    },
    ENTERPRISE: {
      label: 'Enterprise',
      commission_rate: 8,
      monthly_fee: 2000,
      features: [
        'basic_listing',
        'order_management',
        'priority_support',
        'marketing_tools',
        'dedicated_manager',
        'analytics',
      ],
    },
  } as const,
} as const;

export type CommissionType = (typeof COMMISSION.TYPE)[keyof typeof COMMISSION.TYPE];
export type CommissionBasis = (typeof COMMISSION.BASIS)[keyof typeof COMMISSION.BASIS];
export type CommissionFrequency = (typeof COMMISSION.FREQUENCY)[keyof typeof COMMISSION.FREQUENCY];
export type CommissionStatusType =
  (typeof COMMISSION.COMMISSION_STATUS)[keyof typeof COMMISSION.COMMISSION_STATUS];
export type PayoutSchedule =
  (typeof COMMISSION.PAYOUT_SCHEDULE)[keyof typeof COMMISSION.PAYOUT_SCHEDULE];
export type SellerTier = keyof typeof COMMISSION.SELLER_TIERS;
