/**
 * KycDocument Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { USER_KYC_DOCUMENT } from '@vubon/shared-constants/user';

export type KycDocumentType = (typeof USER_KYC_DOCUMENT)[keyof typeof USER_KYC_DOCUMENT];

const KYC_DOCUMENT_VALUES: ReadonlySet<string> = new Set(
  Object.values(USER_KYC_DOCUMENT)
);

export class KycDocumentVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KycDocumentVO {
    if (typeof raw !== 'string') {
      throw new Error('KYC document type must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!KYC_DOCUMENT_VALUES.has(normalized)) {
      throw new Error(
        `Invalid KYC document: "${raw}". Allowed: ${[...KYC_DOCUMENT_VALUES].join(', ')}`
      );
    }
    return new KycDocumentVO(normalized);
  }

  static isDocumentType(value: string): boolean {
    return KYC_DOCUMENT_VALUES.has(value.trim().toLowerCase());
  }

  is(document: KycDocumentType): boolean {
    return this.value === document;
  }

  isIdentityDocument(): boolean {
    return (
      this.value === USER_KYC_DOCUMENT.NID ||
      this.value === USER_KYC_DOCUMENT.PASSPORT ||
      this.value === USER_KYC_DOCUMENT.DRIVING_LICENSE
    );
  }

  isAddressProof(): boolean {
    return (
      this.value === USER_KYC_DOCUMENT.UTILITY_BILL ||
      this.value === USER_KYC_DOCUMENT.BANK_STATEMENT
    );
  }
}
