/**
 * Voucher domain errors
 * @module cart-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';

export class VoucherNotFoundError extends NotFoundError {
  constructor(code: string) {
    super('Voucher', code);
    this.name = 'VoucherNotFoundError';
  }
}

export class VoucherExpiredError extends ConflictError {
  constructor(code: string) {
    super(`Voucher "${code}" has expired`, 'expiresAt');
    this.name = 'VoucherExpiredError';
  }
}

export class InvalidVoucherCodeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid voucher code "${value}"`, 'code');
    this.name = 'InvalidVoucherCodeError';
  }
}

export class InvalidVoucherStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid voucher status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidVoucherStatusError';
  }
}
