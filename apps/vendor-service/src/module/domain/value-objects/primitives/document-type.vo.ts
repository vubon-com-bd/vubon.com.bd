/**
 * DocumentType Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_DOCUMENT_TYPE } from '@vubon/shared-constants/business';

export type DocumentTypeValue =
  (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];

const VALID_TYPES = new Set<string>(Object.values(VENDOR_DOCUMENT_TYPE));

export class DocumentTypeVO extends BaseTypeVO<DocumentTypeValue> {
  private constructor(value: DocumentTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): DocumentTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DocumentType must be a string', 'documentType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid DocumentType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'documentType',
      );
    }
    return new DocumentTypeVO(normalized as DocumentTypeValue);
  }

  static reconstitute(raw: string): DocumentTypeVO {
    return new DocumentTypeVO(raw as DocumentTypeValue);
  }

  // ─── Predicates ───
  isBusinessLicense(): boolean { return this.value === 'business_license'; }
  isTradeLicense(): boolean { return this.value === 'trade_license'; }
  isTaxId(): boolean { return this.value === 'tax_id'; }
  isVatCertificate(): boolean { return this.value === 'vat_certificate'; }
  isBankStatement(): boolean { return this.value === 'bank_statement'; }
  isIdentityProof(): boolean { return this.value === 'identity_proof'; }
  isAddressProof(): boolean { return this.value === 'address_proof'; }
  isPartnershipDeed(): boolean { return this.value === 'partnership_deed'; }
  isMemorandum(): boolean { return this.value === 'memorandum'; }
  isArticles(): boolean { return this.value === 'articles'; }
  isInsurance(): boolean { return this.value === 'insurance'; }
  isOther(): boolean { return this.value === 'other'; }

  /** Required for all vendors */
  isMandatory(): boolean {
    return this.isBusinessLicense() || this.isTaxId() || this.isIdentityProof();
  }

  /** Company/partnership-only docs */
  isEntitySpecific(): boolean {
    return this.isPartnershipDeed() || this.isMemorandum() || this.isArticles();
  }
}
