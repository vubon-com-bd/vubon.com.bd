/**
 * Vendor Subscription Validator
 * ভেন্ডর সাবস্ক্রিপশন ভ্যালিডেটর
 */

import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants';
import { VendorSubscriptionSchema } from '@vubon/shared-schemas';
import type { VendorSubscription } from '@vubon/shared-types';

export interface VendorSubscriptionValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorSubscription;
}

export const validateVendorSubscription = (data: unknown): VendorSubscriptionValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid subscription data'] },
    };
  }

  const subscription = data as Record<string, unknown>;

  // Vendor ID validation
  if (!subscription.vendorId || typeof subscription.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  // Plan ID validation
  if (!subscription.planId || typeof subscription.planId !== 'string') {
    errors.planId = ['Plan ID is required'];
    valid = false;
  }

  // Status validation - VENDOR_SUBSCRIPTION ব্যবহার
  if (subscription.status) {
    const statusValues = Object.values(VENDOR_SUBSCRIPTION.STATUS) as string[];
    if (!statusValues.includes(subscription.status as string)) {
      errors.status = ['Invalid subscription status'];
      valid = false;
    }
  }

  // Start date validation
  if (subscription.startDate) {
    const startDate = new Date(subscription.startDate as string);
    if (isNaN(startDate.getTime())) {
      errors.startDate = ['Invalid start date'];
      valid = false;
    }
  } else {
    errors.startDate = ['Start date is required'];
    valid = false;
  }

  // End date validation (optional)
  if (subscription.endDate) {
    const endDate = new Date(subscription.endDate as string);
    if (isNaN(endDate.getTime())) {
      errors.endDate = ['Invalid end date'];
      valid = false;
    }
  }

  // Trial dates validation (optional)
  if (subscription.trialStartDate) {
    const trialStart = new Date(subscription.trialStartDate as string);
    if (isNaN(trialStart.getTime())) {
      errors.trialStartDate = ['Invalid trial start date'];
      valid = false;
    }
  }

  if (subscription.trialEndDate) {
    const trialEnd = new Date(subscription.trialEndDate as string);
    if (isNaN(trialEnd.getTime())) {
      errors.trialEndDate = ['Invalid trial end date'];
      valid = false;
    }
  }

  try {
    const validatedData = VendorSubscriptionSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as VendorSubscription,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorSubscriptionCreate = (
  data: unknown
): VendorSubscriptionValidationResult => {
  return validateVendorSubscription(data);
};

export const validateVendorSubscriptionUpdate = (
  data: unknown
): VendorSubscriptionValidationResult => {
  return validateVendorSubscription(data);
};
