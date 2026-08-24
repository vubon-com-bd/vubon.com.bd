/**
 * Vendor Payout Method Constants
 * Method definitions for vendor payouts
 */

export const VENDOR_PAYOUT_METHOD = {
  // Method Types
  TYPES: {
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_BANKING: 'mobile_banking',
    CASH: 'cash',
    CHEQUE: 'cheque',
    DIGITAL_WALLET: 'digital_wallet',
    CRYPTO: 'crypto',
  } as const,

  // Method Categories
  CATEGORIES: {
    BANKING: 'banking',
    DIGITAL: 'digital',
    PHYSICAL: 'physical',
  } as const,

  // Method Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
  } as const,

  // Method Colors (for UI)
  COLORS: {
    BANK_TRANSFER: '#blue-500',
    MOBILE_BANKING: '#green-500',
    CASH: '#yellow-500',
    CHEQUE: '#purple-500',
    DIGITAL_WALLET: '#orange-500',
    CRYPTO: '#red-500',
  } as const,

  // Method Icons (for UI)
  ICONS: {
    BANK_TRANSFER: '🏦',
    MOBILE_BANKING: '📱',
    CASH: '💵',
    CHEQUE: '📝',
    DIGITAL_WALLET: '👛',
    CRYPTO: '₿',
  } as const,

  // Method Processing Times (in days)
  PROCESSING_TIMES: {
    BANK_TRANSFER: 3,
    MOBILE_BANKING: 1,
    CASH: 0,
    CHEQUE: 5,
    DIGITAL_WALLET: 1,
    CRYPTO: 1,
  } as const,

  // Method Limits (in BDT)
  LIMITS: {
    BANK_TRANSFER: {
      min: 100,
      max: 1000000,
    },
    MOBILE_BANKING: {
      min: 50,
      max: 500000,
    },
    CASH: {
      min: 100,
      max: 500000,
    },
    CHEQUE: {
      min: 500,
      max: 2000000,
    },
    DIGITAL_WALLET: {
      min: 50,
      max: 300000,
    },
    CRYPTO: {
      min: 100,
      max: 1000000,
    },
  } as const,

  // Method Fees
  FEES: {
    BANK_TRANSFER: 0,
    MOBILE_BANKING: 0,
    CASH: 0,
    CHEQUE: 50,
    DIGITAL_WALLET: 10,
    CRYPTO: 100,
  } as const,
} as const;

// Method Types
export type VendorPayoutMethodType =
  (typeof VENDOR_PAYOUT_METHOD.TYPES)[keyof typeof VENDOR_PAYOUT_METHOD.TYPES];

// Method Categories
export type VendorPayoutMethodCategory =
  (typeof VENDOR_PAYOUT_METHOD.CATEGORIES)[keyof typeof VENDOR_PAYOUT_METHOD.CATEGORIES];

// Method Statuses
export type VendorPayoutMethodStatus =
  (typeof VENDOR_PAYOUT_METHOD.STATUS)[keyof typeof VENDOR_PAYOUT_METHOD.STATUS];

// Method Colors
export type VendorPayoutMethodColor =
  (typeof VENDOR_PAYOUT_METHOD.COLORS)[keyof typeof VENDOR_PAYOUT_METHOD.COLORS];

// Method Icons
export type VendorPayoutMethodIcon =
  (typeof VENDOR_PAYOUT_METHOD.ICONS)[keyof typeof VENDOR_PAYOUT_METHOD.ICONS];

// Method Limits
export type VendorPayoutMethodLimits =
  (typeof VENDOR_PAYOUT_METHOD.LIMITS)[keyof typeof VENDOR_PAYOUT_METHOD.LIMITS];

// Utility Functions
export function vendorPayoutMethodGetLabel(method: VendorPayoutMethodType): string {
  const labels: Record<VendorPayoutMethodType, string> = {
    [VENDOR_PAYOUT_METHOD.TYPES.BANK_TRANSFER]: 'Bank Transfer',
    [VENDOR_PAYOUT_METHOD.TYPES.MOBILE_BANKING]: 'Mobile Banking',
    [VENDOR_PAYOUT_METHOD.TYPES.CASH]: 'Cash',
    [VENDOR_PAYOUT_METHOD.TYPES.CHEQUE]: 'Cheque',
    [VENDOR_PAYOUT_METHOD.TYPES.DIGITAL_WALLET]: 'Digital Wallet',
    [VENDOR_PAYOUT_METHOD.TYPES.CRYPTO]: 'Cryptocurrency',
  };
  return labels[method] || 'Unknown';
}

export function vendorPayoutMethodGetCategory(
  method: VendorPayoutMethodType
): VendorPayoutMethodCategory {
  const categories: Record<VendorPayoutMethodType, VendorPayoutMethodCategory> = {
    [VENDOR_PAYOUT_METHOD.TYPES.BANK_TRANSFER]: VENDOR_PAYOUT_METHOD.CATEGORIES.BANKING,
    [VENDOR_PAYOUT_METHOD.TYPES.MOBILE_BANKING]: VENDOR_PAYOUT_METHOD.CATEGORIES.DIGITAL,
    [VENDOR_PAYOUT_METHOD.TYPES.CASH]: VENDOR_PAYOUT_METHOD.CATEGORIES.PHYSICAL,
    [VENDOR_PAYOUT_METHOD.TYPES.CHEQUE]: VENDOR_PAYOUT_METHOD.CATEGORIES.BANKING,
    [VENDOR_PAYOUT_METHOD.TYPES.DIGITAL_WALLET]: VENDOR_PAYOUT_METHOD.CATEGORIES.DIGITAL,
    [VENDOR_PAYOUT_METHOD.TYPES.CRYPTO]: VENDOR_PAYOUT_METHOD.CATEGORIES.DIGITAL,
  };
  return categories[method] || VENDOR_PAYOUT_METHOD.CATEGORIES.BANKING;
}

export function vendorPayoutMethodGetStatusLabel(status: VendorPayoutMethodStatus): string {
  const labels: Record<VendorPayoutMethodStatus, string> = {
    [VENDOR_PAYOUT_METHOD.STATUS.ACTIVE]: 'Active',
    [VENDOR_PAYOUT_METHOD.STATUS.INACTIVE]: 'Inactive',
    [VENDOR_PAYOUT_METHOD.STATUS.PENDING]: 'Pending',
    [VENDOR_PAYOUT_METHOD.STATUS.VERIFIED]: 'Verified',
    [VENDOR_PAYOUT_METHOD.STATUS.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown';
}

export function vendorPayoutMethodGetColor(
  method: VendorPayoutMethodType
): VendorPayoutMethodColor {
  const colors: Record<VendorPayoutMethodType, VendorPayoutMethodColor> = {
    [VENDOR_PAYOUT_METHOD.TYPES.BANK_TRANSFER]: VENDOR_PAYOUT_METHOD.COLORS.BANK_TRANSFER,
    [VENDOR_PAYOUT_METHOD.TYPES.MOBILE_BANKING]: VENDOR_PAYOUT_METHOD.COLORS.MOBILE_BANKING,
    [VENDOR_PAYOUT_METHOD.TYPES.CASH]: VENDOR_PAYOUT_METHOD.COLORS.CASH,
    [VENDOR_PAYOUT_METHOD.TYPES.CHEQUE]: VENDOR_PAYOUT_METHOD.COLORS.CHEQUE,
    [VENDOR_PAYOUT_METHOD.TYPES.DIGITAL_WALLET]: VENDOR_PAYOUT_METHOD.COLORS.DIGITAL_WALLET,
    [VENDOR_PAYOUT_METHOD.TYPES.CRYPTO]: VENDOR_PAYOUT_METHOD.COLORS.CRYPTO,
  };
  return colors[method] || '#gray-400';
}

export function vendorPayoutMethodGetIcon(method: VendorPayoutMethodType): VendorPayoutMethodIcon {
  const icons: Record<VendorPayoutMethodType, VendorPayoutMethodIcon> = {
    [VENDOR_PAYOUT_METHOD.TYPES.BANK_TRANSFER]: VENDOR_PAYOUT_METHOD.ICONS.BANK_TRANSFER,
    [VENDOR_PAYOUT_METHOD.TYPES.MOBILE_BANKING]: VENDOR_PAYOUT_METHOD.ICONS.MOBILE_BANKING,
    [VENDOR_PAYOUT_METHOD.TYPES.CASH]: VENDOR_PAYOUT_METHOD.ICONS.CASH,
    [VENDOR_PAYOUT_METHOD.TYPES.CHEQUE]: VENDOR_PAYOUT_METHOD.ICONS.CHEQUE,
    [VENDOR_PAYOUT_METHOD.TYPES.DIGITAL_WALLET]: VENDOR_PAYOUT_METHOD.ICONS.DIGITAL_WALLET,
    [VENDOR_PAYOUT_METHOD.TYPES.CRYPTO]: VENDOR_PAYOUT_METHOD.ICONS.CRYPTO,
  };
  return icons[method] || '🏦';
}

export function vendorPayoutMethodGetProcessingTime(method: VendorPayoutMethodType): number {
  const times: Record<VendorPayoutMethodType, number> = {
    [VENDOR_PAYOUT_METHOD.TYPES.BANK_TRANSFER]: VENDOR_PAYOUT_METHOD.PROCESSING_TIMES.BANK_TRANSFER,
    [VENDOR_PAYOUT_METHOD.TYPES.MOBILE_BANKING]:
      VENDOR_PAYOUT_METHOD.PROCESSING_TIMES.MOBILE_BANKING,
    [VENDOR_PAYOUT_METHOD.TYPES.CASH]: VENDOR_PAYOUT_METHOD.PROCESSING_TIMES.CASH,
    [VENDOR_PAYOUT_METHOD.TYPES.CHEQUE]: VENDOR_PAYOUT_METHOD.PROCESSING_TIMES.CHEQUE,
    [VENDOR_PAYOUT_METHOD.TYPES.DIGITAL_WALLET]:
      VENDOR_PAYOUT_METHOD.PROCESSING_TIMES.DIGITAL_WALLET,
    [VENDOR_PAYOUT_METHOD.TYPES.CRYPTO]: VENDOR_PAYOUT_METHOD.PROCESSING_TIMES.CRYPTO,
  };
  return times[method] || 3;
}

export function vendorPayoutMethodGetLimits(
  method: VendorPayoutMethodType
): VendorPayoutMethodLimits {
  const limits: Record<VendorPayoutMethodType, VendorPayoutMethodLimits> = {
    [VENDOR_PAYOUT_METHOD.TYPES.BANK_TRANSFER]: VENDOR_PAYOUT_METHOD.LIMITS.BANK_TRANSFER,
    [VENDOR_PAYOUT_METHOD.TYPES.MOBILE_BANKING]: VENDOR_PAYOUT_METHOD.LIMITS.MOBILE_BANKING,
    [VENDOR_PAYOUT_METHOD.TYPES.CASH]: VENDOR_PAYOUT_METHOD.LIMITS.CASH,
    [VENDOR_PAYOUT_METHOD.TYPES.CHEQUE]: VENDOR_PAYOUT_METHOD.LIMITS.CHEQUE,
    [VENDOR_PAYOUT_METHOD.TYPES.DIGITAL_WALLET]: VENDOR_PAYOUT_METHOD.LIMITS.DIGITAL_WALLET,
    [VENDOR_PAYOUT_METHOD.TYPES.CRYPTO]: VENDOR_PAYOUT_METHOD.LIMITS.CRYPTO,
  };
  return limits[method] || VENDOR_PAYOUT_METHOD.LIMITS.BANK_TRANSFER;
}

export function vendorPayoutMethodGetFee(method: VendorPayoutMethodType): number {
  const fees: Record<VendorPayoutMethodType, number> = {
    [VENDOR_PAYOUT_METHOD.TYPES.BANK_TRANSFER]: VENDOR_PAYOUT_METHOD.FEES.BANK_TRANSFER,
    [VENDOR_PAYOUT_METHOD.TYPES.MOBILE_BANKING]: VENDOR_PAYOUT_METHOD.FEES.MOBILE_BANKING,
    [VENDOR_PAYOUT_METHOD.TYPES.CASH]: VENDOR_PAYOUT_METHOD.FEES.CASH,
    [VENDOR_PAYOUT_METHOD.TYPES.CHEQUE]: VENDOR_PAYOUT_METHOD.FEES.CHEQUE,
    [VENDOR_PAYOUT_METHOD.TYPES.DIGITAL_WALLET]: VENDOR_PAYOUT_METHOD.FEES.DIGITAL_WALLET,
    [VENDOR_PAYOUT_METHOD.TYPES.CRYPTO]: VENDOR_PAYOUT_METHOD.FEES.CRYPTO,
  };
  return fees[method] || 0;
}

export function vendorPayoutMethodIsActive(status: VendorPayoutMethodStatus): boolean {
  return (
    status === VENDOR_PAYOUT_METHOD.STATUS.ACTIVE || status === VENDOR_PAYOUT_METHOD.STATUS.VERIFIED
  );
}
