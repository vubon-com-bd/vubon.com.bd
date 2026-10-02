/**
 * VoucherCode Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Uppercase A-Z, digits, dash — normalized
 * - Length 8–32 chars (longer than coupons for security)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { VOUCHER_LIMIT } from '@vubon/shared-constants/business/cart';
import { InvalidVoucherCodeError } from '../../errors/voucher.errors.js';

const CODE_PATTERN = /^[A-Z0-9][A-Z0-9-]*[A-Z0-9]$/;

export class VoucherCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VoucherCodeVO {
    if (typeof raw !== 'string') {
      throw new InvalidVoucherCodeError(String(raw));
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < VOUCHER_LIMIT.CODE_MIN_LENGTH) {
      throw new InvalidVoucherCodeError(
        `${normalized} (min ${VOUCHER_LIMIT.CODE_MIN_LENGTH} chars)`,
      );
    }
    if (normalized.length > VOUCHER_LIMIT.CODE_MAX_LENGTH) {
      throw new InvalidVoucherCodeError(
        `${normalized} (max ${VOUCHER_LIMIT.CODE_MAX_LENGTH} chars)`,
      );
    }
    if (!CODE_PATTERN.test(normalized)) {
      throw new InvalidVoucherCodeError(`${normalized} (invalid format)`);
    }
    return new VoucherCodeVO(normalized);
  }

  static reconstitute(raw: string): VoucherCodeVO {
    return new VoucherCodeVO(raw);
  }

  isGiftCardFormat(): boolean {
    return this.value.startsWith('GC-');
  }

  isStoreCreditFormat(): boolean {
    return this.value.startsWith('SC-');
  }

  isLoyaltyFormat(): boolean {
    return this.value.startsWith('LY-');
  }
}
