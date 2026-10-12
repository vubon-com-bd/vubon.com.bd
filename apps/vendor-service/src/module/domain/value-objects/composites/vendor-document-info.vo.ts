/**
 * VendorDocumentInfoVO — full document metadata
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DocumentIdVO } from '../primitives/document-id.vo.js';
import { DocumentTypeVO } from '../primitives/document-type.vo.js';
import { DocumentStatusVO } from '../primitives/document-status.vo.js';
import { DocumentUrlVO } from '../primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../primitives/document-file-size.vo.js';

export interface VendorDocumentInfoVOProps {
  readonly id: DocumentIdVO;
  readonly type: DocumentTypeVO;
  readonly status: DocumentStatusVO;
  readonly fileUrl: DocumentUrlVO;
  readonly fileName: string;
  readonly mimeType: DocumentMimeTypeVO;
  readonly fileSize: DocumentFileSizeVO;
  readonly documentNumber?: string;
  readonly issuedAt?: string;
  readonly expiresAt?: string;
  readonly verifiedAt?: string;
  readonly rejectionReason?: string;
}

export class VendorDocumentInfoVO extends BaseVO<VendorDocumentInfoVOProps> {
  private constructor(props: VendorDocumentInfoVOProps) {
    super(props);
  }

  static create(props: VendorDocumentInfoVOProps): VendorDocumentInfoVO {
    if (!(props.id instanceof DocumentIdVO)) {
      throw new ValidationError('Document info requires DocumentIdVO', 'id');
    }
    if (!(props.type instanceof DocumentTypeVO)) {
      throw new ValidationError('Document info requires DocumentTypeVO', 'type');
    }
    if (!(props.status instanceof DocumentStatusVO)) {
      throw new ValidationError('Document info requires DocumentStatusVO', 'status');
    }
    if (!(props.fileUrl instanceof DocumentUrlVO)) {
      throw new ValidationError('Document info requires DocumentUrlVO', 'fileUrl');
    }
    if (typeof props.fileName !== 'string' || props.fileName.trim().length === 0) {
      throw new ValidationError('Document file name cannot be empty', 'fileName');
    }
    if (!(props.mimeType instanceof DocumentMimeTypeVO)) {
      throw new ValidationError('Document info requires DocumentMimeTypeVO', 'mimeType');
    }
    if (!(props.fileSize instanceof DocumentFileSizeVO)) {
      throw new ValidationError('Document info requires DocumentFileSizeVO', 'fileSize');
    }
    // Business rule: types requiring expiry must have expiresAt
    if (props.type.requiresExpiry() && !props.expiresAt) {
      throw new ValidationError(
        `Document type "${props.type.value}" requires an expiry date`,
        'expiresAt',
      );
    }
    // Business rule: verified documents must have verifiedAt
    if (props.status.isVerified() && !props.verifiedAt) {
      throw new ValidationError('Verified document requires verifiedAt', 'verifiedAt');
    }
    // Business rule: rejected documents must have a rejection reason
    if (props.status.isRejected() && !props.rejectionReason) {
      throw new ValidationError('Rejected document requires a reason', 'rejectionReason');
    }
    return new VendorDocumentInfoVO(props);
  }

  static reconstitute(props: VendorDocumentInfoVOProps): VendorDocumentInfoVO {
    return new VendorDocumentInfoVO(props);
  }

  get id(): DocumentIdVO { return this.value.id; }
  get type(): DocumentTypeVO { return this.value.type; }
  get status(): DocumentStatusVO { return this.value.status; }
  get fileUrl(): DocumentUrlVO { return this.value.fileUrl; }
  get fileName(): string { return this.value.fileName; }
  get mimeType(): DocumentMimeTypeVO { return this.value.mimeType; }
  get fileSize(): DocumentFileSizeVO { return this.value.fileSize; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }

  isExpired(at: Date = new Date()): boolean {
    if (!this.value.expiresAt) return false;
    return at.getTime() > Date.parse(this.value.expiresAt);
  }

  isExpiringSoon(daysThreshold: number = 30, at: Date = new Date()): boolean {
    if (!this.value.expiresAt) return false;
    const days = (Date.parse(this.value.expiresAt) - at.getTime()) / (24 * 60 * 60 * 1000);
    return days >= 0 && days <= daysThreshold;
  }

  isValidDocument(): boolean {
    return this.value.status.isVerified() && !this.isExpired();
  }
}
