/**
 * Return Policy Config
 * রিটার্ন পলিসি কনফিগারেশন
 */

import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants';

export interface ReturnPolicyConfig {
  enabled: boolean;
  types: Record<string, string>;
  reasons: Record<string, string>;
  status: Record<string, string>;
  defaultDays: number;
  maxDays: number;
  restockingFee: number;
  defaults: {
    returnWindow: number;
    replacementWindow: number;
    restockingFee: number;
    maxItems: number;
  };
}

export const returnPolicyConfig: ReturnPolicyConfig = {
  enabled: true,

  types: {
    standard: VENDOR_RETURN_POLICY.TYPES.STANDARD,
    extended: VENDOR_RETURN_POLICY.TYPES.EXTENDED,
    no_return: VENDOR_RETURN_POLICY.TYPES.NO_RETURN,
    replacement: VENDOR_RETURN_POLICY.TYPES.REPLACEMENT,
    store_credit: VENDOR_RETURN_POLICY.TYPES.STORE_CREDIT,
  },

  reasons: {
    damaged: VENDOR_RETURN_POLICY.REASONS.DAMAGED,
    defective: VENDOR_RETURN_POLICY.REASONS.DEFECTIVE,
    wrong_item: VENDOR_RETURN_POLICY.REASONS.WRONG_ITEM,
    not_as_described: VENDOR_RETURN_POLICY.REASONS.NOT_AS_DESCRIBED,
    changed_mind: VENDOR_RETURN_POLICY.REASONS.CHANGED_MIND,
    size_issue: VENDOR_RETURN_POLICY.REASONS.SIZE_ISSUE,
    color_issue: VENDOR_RETURN_POLICY.REASONS.COLOR_ISSUE,
    quality_issue: VENDOR_RETURN_POLICY.REASONS.QUALITY_ISSUE,
    delivery_issue: VENDOR_RETURN_POLICY.REASONS.DELIVERY_ISSUE,
  },

  status: {
    pending: VENDOR_RETURN_POLICY.STATUS.PENDING,
    approved: VENDOR_RETURN_POLICY.STATUS.APPROVED,
    rejected: VENDOR_RETURN_POLICY.STATUS.REJECTED,
    processing: VENDOR_RETURN_POLICY.STATUS.PROCESSING,
    completed: VENDOR_RETURN_POLICY.STATUS.COMPLETED,
    cancelled: VENDOR_RETURN_POLICY.STATUS.CANCELLED,
  },

  defaultDays: 7,
  maxDays: 30,
  restockingFee: 10,

  defaults: {
    returnWindow: VENDOR_RETURN_POLICY.DEFAULTS.RETURN_WINDOW,
    replacementWindow: VENDOR_RETURN_POLICY.DEFAULTS.REPLACEMENT_WINDOW,
    restockingFee: VENDOR_RETURN_POLICY.DEFAULTS.RESTOCKING_FEE,
    maxItems: VENDOR_RETURN_POLICY.DEFAULTS.MAX_ITEMS,
  },
} as const;

export type ReturnPolicyConfigType = typeof returnPolicyConfig;
