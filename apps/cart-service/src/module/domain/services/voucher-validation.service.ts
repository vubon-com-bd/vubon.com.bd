/**
 * VoucherValidationService — Validate voucher application
 * @module cart-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { VoucherCodeVO } from '../value-objects/primitives/voucher-code.vo.js';
import { CartVoucherEntity } from '../entities/cart-voucher.entity.js';

export interface VoucherValidationInput {
  readonly code: string;
  readonly subtotal: number;
  readonly currency: string;
  readonly alreadyApplied: readonly CartVoucherEntity[];
  readonly maxVouchersAllowed?: number;
}

export interface VoucherValidationResult {
  readonly valid: boolean;
  readonly appliedAmount: number;
  readonly remainingAmount: number;
  readonly reason?: string;
}

export class VoucherValidationService {
  private static readonly DEFAULT_MAX_VOUCHERS = 1;

  static validate(input: VoucherValidationInput): VoucherValidationResult {
    const {
      code,
      subtotal,
      alreadyApplied,
      maxVouchersAllowed = this.DEFAULT_MAX_VOUCHERS,
    } = input;

    if (subtotal <= 0) {
      return {
        valid: false,
        appliedAmount: 0,
        remainingAmount: 0,
        reason: 'Empty cart',
      };
    }

    let codeVO: VoucherCodeVO;
    try {
      codeVO = VoucherCodeVO.create(code);
    } catch {
      return {
        valid: false,
        appliedAmount: 0,
        remainingAmount: 0,
        reason: 'Invalid code format',
      };
    }

    // Already applied
    const existing = alreadyApplied.find((v) => v.code.value === codeVO.value);
    if (existing && !existing.isFinal()) {
      return {
        valid: false,
        appliedAmount: 0,
        remainingAmount: 0,
        reason: 'Voucher already applied',
      };
    }

    // Count limit
    const activeCount = alreadyApplied.filter((v) => v.isRedeemable()).length;
    if (activeCount >= maxVouchersAllowed) {
      return {
        valid: false,
        appliedAmount: 0,
        remainingAmount: 0,
        reason: 'Voucher limit reached',
      };
    }

    // Metadata lookup
    const meta = alreadyApplied.find((v) => v.code.value === codeVO.value);
    if (!meta) {
      return {
        valid: true,
        appliedAmount: 0,
        remainingAmount: 0,
        reason: 'Voucher meta lookup required',
      };
    }

    if (!meta.canBeApplied()) {
      return {
        valid: false,
        appliedAmount: 0,
        remainingAmount: meta.remainingAmount,
        reason: 'Voucher not applicable',
      };
    }

    const appliedAmount = Math.min(meta.remainingAmount, subtotal);
    return {
      valid: true,
      appliedAmount,
      remainingAmount: meta.remainingAmount - appliedAmount,
    };
  }

  static assertValid(input: VoucherValidationInput): VoucherValidationResult {
    const result = this.validate(input);
    if (!result.valid) {
      throw new BusinessRuleError(
        `Voucher "${input.code}" not applicable: ${result.reason ?? 'unknown'}`,
        'VOUCHER_NOT_APPLICABLE',
        { code: input.code, reason: result.reason },
      );
    }
    return result;
  }

  static computeAppliedAmount(
    voucher: CartVoucherEntity,
    subtotal: number,
  ): number {
    return Math.min(voucher.remainingAmount, subtotal);
  }
}
