/**
 * KycDocumentType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidKycDocumentTypeError } from '../../errors/kyc.errors.js';

export type KycDocumentTypeValue =
  | 'national_id'
  | 'passport'
  | 'driving_license'
  | 'birth_certificate'
  | 'trade_license'
  | 'tin_certificate'
  | 'utility_bill'
  | 'bank_statement';

const VALID_TYPES: readonly KycDocumentTypeValue[] = [
  'national_id',
  'passport',
  'driving_license',
  'birth_certificate',
  'trade_license',
  'tin_certificate',
  'utility_bill',
  'bank_statement',
];

export class KycDocumentTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KycDocumentTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidKycDocumentTypeError(String(raw), VALID_TYPES);
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID_TYPES.includes(normalized as KycDocumentTypeValue)) {
      throw new InvalidKycDocumentTypeError(normalized, VALID_TYPES);
    }
    return new KycDocumentTypeVO(normalized);
  }

  static nationalId(): KycDocumentTypeVO { return new KycDocumentTypeVO('national_id'); }
  static passport(): KycDocumentTypeVO { return new KycDocumentTypeVO('passport'); }
  static drivingLicense(): KycDocumentTypeVO { return new KycDocumentTypeVO('driving_license'); }
  static tradeLicense(): KycDocumentTypeVO { return new KycDocumentTypeVO('trade_license'); }

  static reconstitute(raw: string): KycDocumentTypeVO {
    return new KycDocumentTypeVO(raw);
  }

  isIdentityDocument(): boolean {
    return ['national_id', 'passport', 'driving_license', 'birth_certificate'].includes(
      this.value,
    );
  }
  isBusinessDocument(): boolean {
    return ['trade_license', 'tin_certificate'].includes(this.value);
  }
  isAddressProof(): boolean {
    return ['utility_bill', 'bank_statement'].includes(this.value);
  }
}
