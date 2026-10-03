/**
 * VoucherValidator
 * @module cart-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { VOUCHER_LIMIT } from '@vubon/shared-constants/business/cart';

export interface VoucherValidationInput {
  readonly code: string;
}

export class VoucherValidator {
  static validateApply(input: VoucherValidationInput): void {
    if (!input.code || input.code.trim().length === 0) {
      throw new ApplicationValidationError('Voucher code is required', 'code');
    }
    const normalized = input.code.trim().toUpperCase();
    if (normalized.length < VOUCHER_LIMIT.CODE_MIN_LENGTH) {
      throw new ApplicationValidationError(
        `Voucher code must be at least ${VOUCHER_LIMIT.CODE_MIN_LENGTH} characters`,
        'code',
      );
    }
    if (normalized.length > VOUCHER_LIMIT.CODE_MAX_LENGTH) {
      throw new ApplicationValidationError(
        `Voucher code cannot exceed ${VOUCHER_LIMIT.CODE_MAX_LENGTH} characters`,
        'code',
      );
    }
    if (!/^[A-Z0-9-]+$/.test(normalized)) {
      throw new ApplicationValidationError(
        'Voucher code contains invalid characters',
        'code',
      );
    }
  }
}
