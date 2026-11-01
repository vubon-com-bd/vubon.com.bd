/**
 * VendorDocumentVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর একটি uploaded document।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';
import { VENDOR_DOCUMENT } from '@vubon/shared-constants/business';

import { DocumentIdVO } from '../primitives/document-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { DocumentTypeVO } from '../primitives/document-type.vo.js';
import { DocumentStatusVO } from '../primitives/document-status.vo.js';

export interface VendorDocumentVOProps {
  readonly id: DocumentIdVO;
  readonly vendorId: VendorIdVO;
  readonly type: DocumentTypeVO;
  readonly status: DocumentStatusVO;
  readonly documentNumber?: string;
  readonly fileUrl: string;
  readonly fileName: string;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly issuedAt?: string;
  readonly expiresAt?: string;
  readonly uploadedAt: string;
  readonly verifiedAt?: string;
  readonly verifiedBy?: string;
  readonly rejectionReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const MAX_SIZE_BYTES = VENDOR_DOCUMENT.MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export class VendorDocumentVO extends BaseVO<VendorDocumentVOProps> {
  private constructor(props: VendorDocumentVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorDocumentVOProps): VendorDocumentVO {
    const vo = new VendorDocumentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorDocumentVOProps): VendorDocumentVO {
    return new VendorDocumentVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!v.fileUrl || !REGEX.URL.test(v.fileUrl)) {
      throw new ValidationError('Document fileUrl must be a valid URL', 'fileUrl');
    }
    if (!v.fileName || v.fileName.length > 255) {
      throw new ValidationError('Document fileName max 255 chars', 'fileName');
    }
    if (!Number.isInteger(v.fileSize) || v.fileSize <= 0) {
      throw new ValidationError('Document fileSize must be a positive integer', 'fileSize');
    }
    if (v.fileSize > MAX_SIZE_BYTES) {
      throw new ValidationError(
        `Document fileSize exceeds max ${VENDOR_DOCUMENT.MAX_SIZE_MB}MB`,
        'fileSize',
      );
    }
    if (!ALLOWED_MIME_TYPES.has(v.mimeType)) {
      throw new ValidationError(`Unsupported mimeType: ${v.mimeType}`, 'mimeType');
    }

    if (v.issuedAt && v.expiresAt) {
      if (new Date(v.issuedAt) >= new Date(v.expiresAt)) {
        throw new ValidationError('issuedAt must be before expiresAt', 'expiresAt');
      }
    }

    if (v.status.isVerified() && !v.verifiedAt) {
      throw new ValidationError('Verified document must have verifiedAt', 'verifiedAt');
    }
    if (v.status.isRejected() && !v.rejectionReason) {
      throw new ValidationError('Rejected document must have rejectionReason', 'rejectionReason');
    }
  }

  // ─── Getters ───
  get id(): DocumentIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): DocumentTypeVO { return this.value.type; }
  get status(): DocumentStatusVO { return this.value.status; }
  get documentNumber(): string | undefined { return this.value.documentNumber; }
  get fileUrl(): string { return this.value.fileUrl; }
  get fileName(): string { return this.value.fileName; }
  get fileSize(): number { return this.value.fileSize; }
  get mimeType(): string { return this.value.mimeType; }
  get issuedAt(): string | undefined { return this.value.issuedAt; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }
  get uploadedAt(): string { return this.value.uploadedAt; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }
  get verifiedBy(): string | undefined { return this.value.verifiedBy; }
  get rejectionReason(): string | undefined { return this.value.rejectionReason; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isPending(): boolean { return this.status.isPending(); }
  isVerified(): boolean { return this.status.isVerified(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isExpired(): boolean { return this.status.isExpired(); }
  isResubmitted(): boolean { return this.status.isResubmitted(); }

  hasExpiry(): boolean { return this.expiresAt !== undefined; }
  hasDocumentNumber(): boolean { return this.documentNumber !== undefined; }
  hasIssuedAt(): boolean { return this.issuedAt !== undefined; }

  /** Mandatory document type */
  isMandatory(): boolean {
    return this.type.isMandatory();
  }

  /** File size in MB (rounded to 2 decimals) */
  get fileSizeMB(): number {
    return Math.round((this.fileSize / (1024 * 1024)) * 100) / 100;
  }

  /** Days until expiry (null if no expiry) */
  get daysUntilExpiry(): number | null {
    if (!this.expiresAt) return null;
    const diff = new Date(this.expiresAt).getTime() - Date.now();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Expiring within N days */
  isExpiringSoon(days = 30): boolean {
    const d = this.daysUntilExpiry;
    return d !== null && d >= 0 && d <= days;
  }

  /** Already expired based on date */
  isExpiredByDate(): boolean {
    const d = this.daysUntilExpiry;
    return d !== null && d < 0;
  }

  /** Can be approved/rejected (in review state) */
  isReviewable(): boolean {
    return this.isPending() || this.isResubmitted();
  }

  /** Can be resubmitted */
  canResubmit(): boolean {
    return this.isRejected() || this.isExpired();
  }
}
