/**
 * VerificationType Value Object — verification check category
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_VERIFICATION_TYPE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_VERIFICATION_TYPE) as readonly string[];

export class VerificationTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): VerificationTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid verification type "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'verificationType',
      );
    }
    return new VerificationTypeVO(raw);
  }

  static reconstitute(raw: string): VerificationTypeVO {
    return new VerificationTypeVO(raw);
  }

  isContactVerification(): boolean {
    return [
      VENDOR_VERIFICATION_TYPE.EMAIL,
      VENDOR_VERIFICATION_TYPE.PHONE,
      VENDOR_VERIFICATION_TYPE.ADDRESS,
      VENDOR_VERIFICATION_TYPE.WEBSITE,
    ].includes(this.value as never);
  }

  isBusinessVerification(): boolean {
    return [
      VENDOR_VERIFICATION_TYPE.BUSINESS_LICENSE,
      VENDOR_VERIFICATION_TYPE.TAX_ID,
    ].includes(this.value as never);
  }

  isFinancialVerification(): boolean {
    return this.value === VENDOR_VERIFICATION_TYPE.BANK_ACCOUNT;
  }

  isIdentityVerification(): boolean {
    return this.value === VENDOR_VERIFICATION_TYPE.IDENTITY;
  }
}
