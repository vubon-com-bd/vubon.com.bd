/**
 * Schedule Validator
 * সময়সূচী ভ্যালিডেটর
 */

import { SCHEDULE } from '@vubon/shared-constants';
import { FlashSaleScheduleSchema } from '@vubon/shared-schemas';
import type { FlashSaleSchedule } from '@vubon/shared-types';

export interface ScheduleValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSaleSchedule;
}

export const validateSchedule = (data: unknown): ScheduleValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid schedule data'] },
    };
  }

  const schedule = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!schedule.flashSaleId || typeof schedule.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // Date validation
  if (schedule.startDate) {
    const startDate = new Date(schedule.startDate as string);
    if (isNaN(startDate.getTime())) {
      errors.startDate = ['Invalid start date'];
      valid = false;
    }
  } else {
    errors.startDate = ['Start date is required'];
    valid = false;
  }

  if (schedule.endDate) {
    const endDate = new Date(schedule.endDate as string);
    if (isNaN(endDate.getTime())) {
      errors.endDate = ['Invalid end date'];
      valid = false;
    }
  } else {
    errors.endDate = ['End date is required'];
    valid = false;
  }

  // Status validation using SCHEDULE.STATUS
  if (schedule.status) {
    const statusValues = Object.values(SCHEDULE.STATUS) as string[];
    if (!statusValues.includes(schedule.status as string)) {
      errors.status = ['Invalid schedule status'];
      valid = false;
    }
  }

  // Type validation
  if (schedule.type) {
    const validTypes = ['once', 'daily', 'weekly', 'monthly', 'recurring'];
    if (!validTypes.includes(schedule.type as string)) {
      errors.type = ['Invalid schedule type'];
      valid = false;
    }
  } else {
    errors.type = ['Schedule type is required'];
    valid = false;
  }

  try {
    const validatedData = FlashSaleScheduleSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as FlashSaleSchedule,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateScheduleCreate = (data: unknown): ScheduleValidationResult => {
  return validateSchedule(data);
};

export const validateScheduleUpdate = (data: unknown): ScheduleValidationResult => {
  return validateSchedule(data);
};
