/**
 * Voucher Validator
 * ভাউচার ভ্যালিডেটর
 */

import { FLASH_SALE_VOUCHER } from '@vubon/shared-constants';
import { FlashSaleVoucherSchema } from '@vubon/shared-schemas';
import type { FlashSaleVoucher } from '@vubon/shared-types';

export interface VoucherValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSaleVoucher;
}

export const validateVoucher = (data: unknown): VoucherValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid voucher data'] },
    };
  }

  const voucher = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!voucher.flashSaleId || typeof voucher.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // Code validation
  if (!voucher.code || typeof voucher.code !== 'string' || voucher.code.length < 1) {
    errors.code = ['Voucher code is required'];
    valid = false;
  }

  // Type validation using FLASH_SALE_VOUCHER
  if (voucher.type) {
    const typeValues = Object.values(FLASH_SALE_VOUCHER.TYPES) as string[];
    if (!typeValues.includes(voucher.type as string)) {
      errors.type = ['Invalid voucher type'];
      valid = false;
    }
  } else {
    errors.type = ['Voucher type is required'];
    valid = false;
  }

  // Value validation
  if (voucher.value !== undefined) {
    if (typeof voucher.value !== 'number' || voucher.value < 0) {
      errors.value = ['Voucher value must be a positive number'];
      valid = false;
    }
  } else {
    errors.value = ['Voucher value is required'];
    valid = false;
  }

  // Status validation using FLASH_SALE_VOUCHER
  if (voucher.status) {
    const statusValues = Object.values(FLASH_SALE_VOUCHER.STATUS) as string[];
    if (!statusValues.includes(voucher.status as string)) {
      errors.status = ['Invalid voucher status'];
      valid = false;
    }
  }

  try {
    const validatedData = FlashSaleVoucherSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as FlashSaleVoucher,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVoucherCreate = (data: unknown): VoucherValidationResult => {
  return validateVoucher(data);
};

export const validateVoucherUpdate = (data: unknown): VoucherValidationResult => {
  return validateVoucher(data);
};
