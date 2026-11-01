/**
 * KycDocument Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  USER_KYC_DOCUMENT,
  USER_KYC,
} from '@vubon/shared-constants/user';

const VALID: readonly string[] = Object.values(USER_KYC_DOCUMENT);

export interface KycDocumentValue {
  readonly type: string;
  readonly number: string;
  readonly frontUrl: string;
  readonly backUrl?: string;
  readonly selfieUrl?: string;
}

export class KycDocumentVO extends BaseVO<KycDocumentValue> {
  private constructor(value: KycDocumentValue) {
    super(value);
  }

  static create(data: KycDocumentValue): KycDocumentVO {
    if (typeof data.type !== 'string' || !VALID.includes(data.type)) {
      throw new ValidationError(
        `Invalid KYC document type "${data.type}". Allowed: ${VALID.join(', ')}`,
        'type',
      );
    }
    if (typeof data.number !== 'string' || data.number.trim().length === 0) {
      throw new ValidationError('KYC document number cannot be empty', 'number');
    }
    if (typeof data.frontUrl !== 'string' || !data.frontUrl.startsWith('http')) {
      throw new ValidationError('KYC document front URL must be a valid URL', 'frontUrl');
    }
    if (data.backUrl && !data.backUrl.startsWith('http')) {
      throw new ValidationError('KYC document back URL must be a valid URL', 'backUrl');
    }
    if (data.selfieUrl && !data.selfieUrl.startsWith('http')) {
      throw new ValidationError('KYC selfie URL must be a valid URL', 'selfieUrl');
    }
    return new KycDocumentVO(data);
  }

  static reconstitute(data: KycDocumentValue): KycDocumentVO {
    return new KycDocumentVO(data);
  }

  get type(): string { return this.value.type; }
  get number(): string { return this.value.number; }
  get frontUrl(): string { return this.value.frontUrl; }
  get backUrl(): string | undefined { return this.value.backUrl; }
  get selfieUrl(): string | undefined { return this.value.selfieUrl; }

  get maxSizeMb(): number { return USER_KYC.MAX_DOCUMENT_SIZE_MB; }

  isIdentityDocument(): boolean {
    return [
      USER_KYC_DOCUMENT.NID,
      USER_KYC_DOCUMENT.PASSPORT,
      USER_KYC_DOCUMENT.DRIVING_LICENSE,
      USER_KYC_DOCUMENT.BIRTH_CERTIFICATE,
    ].includes(this.value.type as never);
  }
  isAddressProof(): boolean {
    return [
      USER_KYC_DOCUMENT.UTILITY_BILL,
      USER_KYC_DOCUMENT.BANK_STATEMENT,
    ].includes(this.value.type as never);
  }
}
