/**
 * Voucher Application Errors
 * @module cart-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

// ─── Not Found (404) ──────────────────────
export class VoucherNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(code: string) {
    super('Voucher', code);
    this.name = 'VoucherNotFoundApplicationError';
  }
}

// ─── Conflict (409) ───────────────────────
export class VoucherAlreadyAppliedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(cartId: string, code: string) {
    super(`Voucher "${code}" already applied to cart "${cartId}"`, { cartId, code });
    this.name = 'VoucherAlreadyAppliedApplicationError';
  }
}

// ─── Command (400) ────────────────────────
export class ApplyVoucherError extends CommandError {
  constructor(code: string, reason: string) {
    super(`Failed to apply voucher "${code}": ${reason}`, 'ApplyVoucher', undefined);
    void code;
    this.name = 'ApplyVoucherError';
  }
}

export class RemoveVoucherError extends CommandError {
  constructor(code: string, reason: string) {
    super(`Failed to remove voucher "${code}": ${reason}`, 'RemoveVoucher', undefined);
    void code;
    this.name = 'RemoveVoucherError';
  }
}

// ─── Business rules (400) ─────────────────
export class VoucherExpiredApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(code: string, expiredAt: string) {
    super(`Voucher "${code}" expired at ${expiredAt}`, { code, expiredAt });
    this.name = 'VoucherExpiredApplicationError';
  }
}

export class VoucherInsufficientBalanceApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(code: string, required: number, available: number) {
    super(
      `Voucher "${code}" insufficient balance: required ${required}, available ${available}`,
      { code, required, available },
    );
    this.name = 'VoucherInsufficientBalanceApplicationError';
  }
}

export class VoucherNotApplicableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(code: string, reason: string) {
    super(`Voucher "${code}" not applicable: ${reason}`, { code, reason });
    this.name = 'VoucherNotApplicableApplicationError';
  }
}

export class VoucherLimitReachedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(cartId: string, max: number) {
    super(`Cart "${cartId}" voucher limit reached (max ${max})`, { cartId, max });
    this.name = 'VoucherLimitReachedApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class VoucherValidationApplicationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'VoucherValidationApplicationError';
  }
}
