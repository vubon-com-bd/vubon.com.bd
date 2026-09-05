/**
 * Deal Validator
 * ডিল ভ্যালিডেটর
 */

import { DEAL } from '@vubon/shared-constants';
import { DealSchema } from '@vubon/shared-schemas';
import type { Deal } from '@vubon/shared-types';

export interface DealValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Deal;
}

export const validateDeal = (data: unknown): DealValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid deal data'] },
    };
  }

  const deal = data as Record<string, unknown>;

  // Name validation
  if (!deal.name || typeof deal.name !== 'string' || deal.name.length < 1) {
    errors.name = ['Deal name is required'];
    valid = false;
  }

  // Status validation using DEAL.STATUS
  if (deal.status) {
    const statusValues = Object.values(DEAL.STATUS) as string[];
    if (!statusValues.includes(deal.status as string)) {
      errors.status = ['Invalid deal status'];
      valid = false;
    }
  }

  // Type validation
  if (deal.type) {
    const validTypes = ['single', 'bundle', 'buy_get', 'tiered', 'bogo'];
    if (!validTypes.includes(deal.type as string)) {
      errors.type = ['Invalid deal type'];
      valid = false;
    }
  } else {
    errors.type = ['Deal type is required'];
    valid = false;
  }

  // Value validation
  if (deal.value !== undefined) {
    if (typeof deal.value !== 'number' || deal.value < 0) {
      errors.value = ['Deal value must be a positive number'];
      valid = false;
    }
  } else {
    errors.value = ['Deal value is required'];
    valid = false;
  }

  try {
    const validatedData = DealSchema.parse(data);
    // Type assertion with unknown first to avoid type error
    return {
      valid: true,
      errors: {},
      data: validatedData as unknown as Deal,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateDealCreate = (data: unknown): DealValidationResult => {
  return validateDeal(data);
};

export const validateDealUpdate = (data: unknown): DealValidationResult => {
  return validateDeal(data);
};
