/**
 * PayoutMethod Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_PAYOUT_METHOD } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_PAYOUT_METHOD) as readonly string[];

export class PayoutMethodVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): PayoutMethodVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid payout method "${raw}"`, 'method');
    }
    return new PayoutMethodVO(raw);
  }

  static reconstitute(raw: string): PayoutMethodVO { return new PayoutMethodVO(raw); }

  requiresBankAccount(): boolean {
    return [VENDOR_PAYOUT_METHOD.BANK_TRANSFER, VENDOR_PAYOUT_METHOD.MOBILE_BANKING].includes(this.value as never);
  }

  isDigital(): boolean {
    return [VENDOR_PAYOUT_METHOD.PAYPAL, VENDOR_PAYOUT_METHOD.STRIPE, VENDOR_PAYOUT_METHOD.WISE, VENDOR_PAYOUT_METHOD.PAYONEER].includes(this.value as never);
  }

  isManual(): boolean {
    return [VENDOR_PAYOUT_METHOD.CASH, VENDOR_PAYOUT_METHOD.CHEQUE].includes(this.value as never);
  }
}
