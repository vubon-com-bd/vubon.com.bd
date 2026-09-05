/**
 * Bundle Deal Validator
 * বান্ডেল ডিল ভ্যালিডেটর
 */

import { BUNDLE_DEAL } from '@vubon/shared-constants';
import { BundleDealSchema } from '@vubon/shared-schemas';
import type { BundleDeal } from '@vubon/shared-types';

export interface BundleDealValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: BundleDeal;
}

export const validateBundleDeal = (data: unknown): BundleDealValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid bundle deal data'] },
    };
  }

  const bundleDeal = data as Record<string, unknown>;

  // Deal ID validation
  if (!bundleDeal.dealId || typeof bundleDeal.dealId !== 'string') {
    errors.dealId = ['Deal ID is required'];
    valid = false;
  }

  // Products validation
  if (
    !bundleDeal.products ||
    !Array.isArray(bundleDeal.products) ||
    bundleDeal.products.length < 2
  ) {
    errors.products = ['At least 2 products are required'];
    valid = false;
  }

  // Total price validation
  if (bundleDeal.totalPrice !== undefined) {
    if (typeof bundleDeal.totalPrice !== 'number' || bundleDeal.totalPrice < 0) {
      errors.totalPrice = ['Total price must be a positive number'];
      valid = false;
    }
  } else {
    errors.totalPrice = ['Total price is required'];
    valid = false;
  }

  // Bundle price validation
  if (bundleDeal.bundlePrice !== undefined) {
    if (typeof bundleDeal.bundlePrice !== 'number' || bundleDeal.bundlePrice < 0) {
      errors.bundlePrice = ['Bundle price must be a positive number'];
      valid = false;
    }
  } else {
    errors.bundlePrice = ['Bundle price is required'];
    valid = false;
  }

  // Status validation using BUNDLE_DEAL.STATUS
  if (bundleDeal.status) {
    const statusValues = Object.values(BUNDLE_DEAL.STATUS) as string[];
    if (!statusValues.includes(bundleDeal.status as string)) {
      errors.status = ['Invalid bundle deal status'];
      valid = false;
    }
  }

  try {
    const validatedData = BundleDealSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as BundleDeal,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateBundleDealCreate = (data: unknown): BundleDealValidationResult => {
  return validateBundleDeal(data);
};

export const validateBundleDealUpdate = (data: unknown): BundleDealValidationResult => {
  return validateBundleDeal(data);
};
