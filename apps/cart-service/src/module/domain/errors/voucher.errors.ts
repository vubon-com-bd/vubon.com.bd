/**
 * Voucher Domain Errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VoucherNotFoundError extends NotFoundError {
  constructor(code: string) {
    super('Voucher', code);
    this.name = 'VoucherNotFoundError';
  }
}

export class VoucherAlreadyAppliedError extends ConflictError {
  constructor(cartId: string, code: string) {
    super(`Voucher "${code}" already applied to cart "${cartId}"`, 'code');
    this.name = 'VoucherAlreadyAppliedError';
  }
}

export class InvalidVoucherCodeError extends ValidationError {
  constructor(code: string) {
    super(`Invalid voucher code format: "${code}"`, 'code');
    this.name = 'InvalidVoucherCodeError';
  }
}

export class VoucherExpiredError extends BusinessRuleError {
  constructor(code: string, expiredAt: string) {
    super(`Voucher "${code}" expired at ${expiredAt}`, 'VOUCHER_EXPIRED', {
      code,
      expiredAt,
    });
    this.name = 'VoucherExpiredError';
  }
}

export class VoucherAlreadyRedeemedError extends BusinessRuleError {
  constructor(code: string) {
    super(`Voucher "${code}" already redeemed`, 'VOUCHER_ALREADY_REDEEMED', { code });
    this.name = 'VoucherAlreadyRedeemedError';
  }
}

export class VoucherInsufficientBalanceError extends BusinessRuleError {
  constructor(code: string, required: number, available: number) {
    super(
      `Voucher "${code}" insufficient balance: required ${required}, available ${available}`,
      'VOUCHER_INSUFFICIENT_BALANCE',
      { code, required, available },
    );
    this.name = 'VoucherInsufficientBalanceError';
  }
}

export class VoucherNotApplicableError extends BusinessRuleError {
  constructor(code: string, reason: string) {
    super(`Voucher "${code}" not applicable: ${reason}`, 'VOUCHER_NOT_APPLICABLE', {
      code,
      reason,
    });
    this.name = 'VoucherNotApplicableError';
  }
}
