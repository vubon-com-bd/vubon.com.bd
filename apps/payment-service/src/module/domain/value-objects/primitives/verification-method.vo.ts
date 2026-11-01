/**
 * VerificationMethod Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type VerificationMethodValue =
  | 'otp_sms'
  | 'otp_email'
  | 'card_cvv'
  | 'card_3ds'
  | 'biometric'
  | 'manual';

const VALID_METHODS: readonly string[] = [
  'otp_sms',
  'otp_email',
  'card_cvv',
  'card_3ds',
  'biometric',
  'manual',
];

export class VerificationMethodVO extends BaseVO<VerificationMethodValue> {
  private constructor(value: VerificationMethodValue) {
    super(value);
  }

  static create(raw: string): VerificationMethodVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VerificationMethod must be a string', 'method');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_METHODS.includes(normalized)) {
      throw new ValidationError(
        `Invalid VerificationMethod "${normalized}". Allowed: ${VALID_METHODS.join(', ')}`,
        'method',
      );
    }
    return new VerificationMethodVO(normalized as VerificationMethodValue);
  }

  static reconstitute(raw: VerificationMethodValue): VerificationMethodVO {
    return new VerificationMethodVO(raw);
  }

  isOtp(): boolean {
    return this.value === 'otp_sms' || this.value === 'otp_email';
  }

  isCard(): boolean {
    return this.value === 'card_cvv' || this.value === 'card_3ds';
  }

  isBiometric(): boolean { return this.value === 'biometric'; }
  isManual(): boolean { return this.value === 'manual'; }
}
