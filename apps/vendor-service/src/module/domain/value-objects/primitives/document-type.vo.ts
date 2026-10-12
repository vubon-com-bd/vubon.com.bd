/**
 * DocumentType Value Object — vendor document category
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_DOCUMENT_TYPE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_DOCUMENT_TYPE) as readonly string[];

export class DocumentTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): DocumentTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid document type "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'documentType',
      );
    }
    return new DocumentTypeVO(raw);
  }

  static reconstitute(raw: string): DocumentTypeVO {
    return new DocumentTypeVO(raw);
  }

  /** Documents that expire and need renewal. */
  requiresExpiry(): boolean {
    return [
      VENDOR_DOCUMENT_TYPE.BUSINESS_LICENSE,
      VENDOR_DOCUMENT_TYPE.TRADE_LICENSE,
      VENDOR_DOCUMENT_TYPE.TAX_ID,
      VENDOR_DOCUMENT_TYPE.VAT_CERTIFICATE,
      VENDOR_DOCUMENT_TYPE.INSURANCE,
    ].includes(this.value as never);
  }

  /** Mandatory for vendor activation. */
  isMandatory(): boolean {
    return [
      VENDOR_DOCUMENT_TYPE.BUSINESS_LICENSE,
      VENDOR_DOCUMENT_TYPE.TAX_ID,
      VENDOR_DOCUMENT_TYPE.IDENTITY_PROOF,
    ].includes(this.value as never);
  }

  isIdentityDocument(): boolean {
    return this.value === VENDOR_DOCUMENT_TYPE.IDENTITY_PROOF;
  }

  isFinancialDocument(): boolean {
    return [
      VENDOR_DOCUMENT_TYPE.BANK_STATEMENT,
      VENDOR_DOCUMENT_TYPE.TAX_ID,
      VENDOR_DOCUMENT_TYPE.VAT_CERTIFICATE,
    ].includes(this.value as never);
  }
}
