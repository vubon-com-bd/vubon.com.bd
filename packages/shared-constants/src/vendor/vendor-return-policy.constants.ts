/**
 * Vendor Return Policy Constants
 * Configuration for vendor return policies
 */

export const VENDOR_RETURN_POLICY = {
  // Policy Types
  TYPES: {
    STANDARD: 'standard',
    EXTENDED: 'extended',
    NO_RETURN: 'no_return',
    EXCHANGE_ONLY: 'exchange_only',
    STORE_CREDIT: 'store_credit',
  } as const,

  // Policy Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
  } as const,

  // Return Reasons
  REASONS: {
    DAMAGED: 'damaged',
    DEFECTIVE: 'defective',
    WRONG_ITEM: 'wrong_item',
    NOT_SATISFIED: 'not_satisfied',
    SIZE_ISSUE: 'size_issue',
    COLOR_ISSUE: 'color_issue',
    DELIVERY_ISSUE: 'delivery_issue',
    OTHER: 'other',
  } as const,

  // Return Conditions
  CONDITIONS: {
    UNUSED: 'unused',
    ORIGINAL_PACKAGING: 'original_packaging',
    TAGS_ATTACHED: 'tags_attached',
    RECEIPT_REQUIRED: 'receipt_required',
    DAMAGED_ACCEPTED: 'damaged_accepted',
  } as const,

  // Return Periods (in days)
  PERIODS: {
    STANDARD: 7,
    EXTENDED: 30,
    SEASONAL: 45,
    HOLIDAY: 60,
  } as const,

  // Return Fees
  FEES: {
    FREE: 0,
    STANDARD: 50,
    EXPRESS: 100,
    PICKUP: 150,
  } as const,

  // Return Restrictions
  RESTRICTIONS: {
    USED_ITEMS: 'used_items',
    CUSTOM_ITEMS: 'custom_items',
    PERISHABLE_ITEMS: 'perishable_items',
    DIGITAL_ITEMS: 'digital_items',
    SALE_ITEMS: 'sale_items',
  } as const,
} as const;

// Policy Types
export type VendorReturnPolicyType =
  (typeof VENDOR_RETURN_POLICY.TYPES)[keyof typeof VENDOR_RETURN_POLICY.TYPES];

// Policy Statuses
export type VendorReturnPolicyStatus =
  (typeof VENDOR_RETURN_POLICY.STATUS)[keyof typeof VENDOR_RETURN_POLICY.STATUS];

// Return Reasons
export type VendorReturnReason =
  (typeof VENDOR_RETURN_POLICY.REASONS)[keyof typeof VENDOR_RETURN_POLICY.REASONS];

// Return Conditions
export type VendorReturnCondition =
  (typeof VENDOR_RETURN_POLICY.CONDITIONS)[keyof typeof VENDOR_RETURN_POLICY.CONDITIONS];

// Return Restrictions
export type VendorReturnRestriction =
  (typeof VENDOR_RETURN_POLICY.RESTRICTIONS)[keyof typeof VENDOR_RETURN_POLICY.RESTRICTIONS];

// Utility Functions
export function vendorReturnPolicyGetTypeLabel(type: VendorReturnPolicyType): string {
  const labels: Record<VendorReturnPolicyType, string> = {
    [VENDOR_RETURN_POLICY.TYPES.STANDARD]: 'Standard Return',
    [VENDOR_RETURN_POLICY.TYPES.EXTENDED]: 'Extended Return',
    [VENDOR_RETURN_POLICY.TYPES.NO_RETURN]: 'No Return',
    [VENDOR_RETURN_POLICY.TYPES.EXCHANGE_ONLY]: 'Exchange Only',
    [VENDOR_RETURN_POLICY.TYPES.STORE_CREDIT]: 'Store Credit',
  };
  return labels[type] || 'Unknown';
}

export function vendorReturnPolicyGetStatusLabel(status: VendorReturnPolicyStatus): string {
  const labels: Record<VendorReturnPolicyStatus, string> = {
    [VENDOR_RETURN_POLICY.STATUS.ACTIVE]: 'Active',
    [VENDOR_RETURN_POLICY.STATUS.INACTIVE]: 'Inactive',
    [VENDOR_RETURN_POLICY.STATUS.PENDING]: 'Pending',
    [VENDOR_RETURN_POLICY.STATUS.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown';
}

export function vendorReturnPolicyGetReasonLabel(reason: VendorReturnReason): string {
  const labels: Record<VendorReturnReason, string> = {
    [VENDOR_RETURN_POLICY.REASONS.DAMAGED]: 'Damaged',
    [VENDOR_RETURN_POLICY.REASONS.DEFECTIVE]: 'Defective',
    [VENDOR_RETURN_POLICY.REASONS.WRONG_ITEM]: 'Wrong Item',
    [VENDOR_RETURN_POLICY.REASONS.NOT_SATISFIED]: 'Not Satisfied',
    [VENDOR_RETURN_POLICY.REASONS.SIZE_ISSUE]: 'Size Issue',
    [VENDOR_RETURN_POLICY.REASONS.COLOR_ISSUE]: 'Color Issue',
    [VENDOR_RETURN_POLICY.REASONS.DELIVERY_ISSUE]: 'Delivery Issue',
    [VENDOR_RETURN_POLICY.REASONS.OTHER]: 'Other',
  };
  return labels[reason] || 'Unknown';
}

export function vendorReturnPolicyGetPeriodDays(type: VendorReturnPolicyType): number {
  const periods: Record<VendorReturnPolicyType, number> = {
    [VENDOR_RETURN_POLICY.TYPES.STANDARD]: VENDOR_RETURN_POLICY.PERIODS.STANDARD,
    [VENDOR_RETURN_POLICY.TYPES.EXTENDED]: VENDOR_RETURN_POLICY.PERIODS.EXTENDED,
    [VENDOR_RETURN_POLICY.TYPES.NO_RETURN]: 0,
    [VENDOR_RETURN_POLICY.TYPES.EXCHANGE_ONLY]: VENDOR_RETURN_POLICY.PERIODS.STANDARD,
    [VENDOR_RETURN_POLICY.TYPES.STORE_CREDIT]: VENDOR_RETURN_POLICY.PERIODS.STANDARD,
  };
  return periods[type] || 7;
}

export function vendorReturnPolicyIsActive(status: VendorReturnPolicyStatus): boolean {
  return status === VENDOR_RETURN_POLICY.STATUS.ACTIVE;
}

export function vendorReturnPolicyIsReturnable(type: VendorReturnPolicyType): boolean {
  return type !== VENDOR_RETURN_POLICY.TYPES.NO_RETURN;
}

export function vendorReturnPolicyGetFee(type: VendorReturnPolicyType): number {
  const fees: Record<VendorReturnPolicyType, number> = {
    [VENDOR_RETURN_POLICY.TYPES.STANDARD]: VENDOR_RETURN_POLICY.FEES.STANDARD,
    [VENDOR_RETURN_POLICY.TYPES.EXTENDED]: VENDOR_RETURN_POLICY.FEES.STANDARD,
    [VENDOR_RETURN_POLICY.TYPES.NO_RETURN]: 0,
    [VENDOR_RETURN_POLICY.TYPES.EXCHANGE_ONLY]: VENDOR_RETURN_POLICY.FEES.FREE,
    [VENDOR_RETURN_POLICY.TYPES.STORE_CREDIT]: VENDOR_RETURN_POLICY.FEES.FREE,
  };
  return fees[type] || 0;
}
