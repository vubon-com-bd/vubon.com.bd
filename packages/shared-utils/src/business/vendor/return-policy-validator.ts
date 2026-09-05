/**
 * Vendor Return Policy Validator
 * ভেন্ডর রিটার্ন পলিসি ভ্যালিডেটর
 */

import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants';
import { VendorReturnPolicySchema } from '@vubon/shared-schemas';
import type { VendorReturnPolicy } from '@vubon/shared-types';

export interface VendorReturnPolicyValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorReturnPolicy;
}

export const validateVendorReturnPolicy = (data: unknown): VendorReturnPolicyValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid return policy data'] },
    };
  }

  const policy = data as Record<string, unknown>;

  // Vendor ID validation
  if (!policy.vendorId || typeof policy.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  // Type validation - VENDOR_RETURN_POLICY ব্যবহার
  if (policy.type) {
    const typeValues = Object.values(VENDOR_RETURN_POLICY.TYPES) as string[];
    if (!typeValues.includes(policy.type as string)) {
      errors.type = ['Invalid return policy type'];
      valid = false;
    }
  } else {
    errors.type = ['Return policy type is required'];
    valid = false;
  }

  // Return window validation
  if (policy.returnWindow !== undefined) {
    if (typeof policy.returnWindow !== 'number' || policy.returnWindow < 0) {
      errors.returnWindow = ['Return window must be a positive number'];
      valid = false;
    }
  } else {
    errors.returnWindow = ['Return window is required'];
    valid = false;
  }

  // Restocking fee validation - VENDOR_RETURN_POLICY ব্যবহার
  if (policy.restockingFee !== undefined) {
    const restockingFee = policy.restockingFee as number;
    const defaultFee = VENDOR_RETURN_POLICY.DEFAULTS.RESTOCKING_FEE;
    if (restockingFee < 0 || restockingFee > 100) {
      errors.restockingFee = [`Restocking fee must be between 0 and 100 (default: ${defaultFee}%)`];
      valid = false;
    }
  }

  // Return reasons validation - VENDOR_RETURN_POLICY ব্যবহার
  if (policy.acceptedReasons && Array.isArray(policy.acceptedReasons)) {
    const validReasons = Object.values(VENDOR_RETURN_POLICY.REASONS) as string[];
    for (const reason of policy.acceptedReasons) {
      if (!validReasons.includes(reason as string)) {
        errors.acceptedReasons = [`Invalid return reason: ${reason}`];
        valid = false;
        break;
      }
    }
  }

  // Replacement window validation
  if (policy.replacementWindow !== undefined) {
    if (typeof policy.replacementWindow !== 'number' || policy.replacementWindow < 0) {
      errors.replacementWindow = ['Replacement window must be a positive number'];
      valid = false;
    }
  }

  try {
    const validatedData = VendorReturnPolicySchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as VendorReturnPolicy,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorReturnPolicyCreate = (
  data: unknown
): VendorReturnPolicyValidationResult => {
  return validateVendorReturnPolicy(data);
};

export const validateVendorReturnPolicyUpdate = (
  data: unknown
): VendorReturnPolicyValidationResult => {
  return validateVendorReturnPolicy(data);
};
