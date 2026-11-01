/**
 * Vendor Document Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorDocumentNotFoundError extends NotFoundError {
  constructor(documentId: string) {
    super('VendorDocument', documentId);
    this.name = 'VendorDocumentNotFoundError';
  }
}

export class InvalidDocumentTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid document type "${value}". Allowed: ${allowed.join(', ')}`, 'documentType');
    this.name = 'InvalidDocumentTypeError';
  }
}

export class InvalidDocumentStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid document status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDocumentStatusError';
  }
}

export class DocumentAlreadyVerifiedError extends ConflictError {
  constructor(documentId: string) {
    super(`Document "${documentId}" is already verified`, 'documentId');
    this.name = 'DocumentAlreadyVerifiedError';
  }
}

export class DocumentExpiredError extends BusinessRuleError {
  constructor(documentId: string, expiredAt: string) {
    super(
      `Document "${documentId}" expired at ${expiredAt}`,
      'DOCUMENT_EXPIRED',
      { documentId, expiredAt },
    );
    this.name = 'DocumentExpiredError';
  }
}

export class DocumentLimitExceededError extends BusinessRuleError {
  constructor(vendorId: string, max: number) {
    super(
      `Vendor "${vendorId}" exceeded max documents (${max})`,
      'DOCUMENT_LIMIT_EXCEEDED',
      { vendorId, max },
    );
    this.name = 'DocumentLimitExceededError';
  }
}
