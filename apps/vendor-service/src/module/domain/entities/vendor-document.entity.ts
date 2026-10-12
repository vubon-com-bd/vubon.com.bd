/**
 * VendorDocumentEntity — a single uploaded document
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DocumentTypeVO } from '../value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../value-objects/primitives/document-status.vo.js';
import { DocumentUrlVO } from '../value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../value-objects/primitives/document-file-size.vo.js';

export interface VendorDocumentEntityProps {
  readonly vendorId: string;
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
  readonly verifiedBy?: string;
  readonly rejectionReason?: string;
  readonly notes?: string;
}

export class VendorDocumentEntity extends BaseEntity<string> {
  private _status: DocumentStatusVO;
  private _fileUrl: DocumentUrlVO;
  private _fileName: string;
  private _verifiedAt?: string;
  private _verifiedBy?: string;
  private _rejectionReason?: string;
  private _notes?: string;

  private readonly _vendorId: string;
  private readonly _type: DocumentTypeVO;
  private readonly _mimeType: DocumentMimeTypeVO;
  private readonly _fileSize: DocumentFileSizeVO;
  private readonly _documentNumber?: string;
  private readonly _issuedAt?: string;
  private readonly _expiresAt?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorDocumentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._status = props.status;
    this._fileUrl = props.fileUrl;
    this._fileName = props.fileName;
    this._mimeType = props.mimeType;
    this._fileSize = props.fileSize;
    this._documentNumber = props.documentNumber;
    this._issuedAt = props.issuedAt;
    this._expiresAt = props.expiresAt;
    this._verifiedAt = props.verifiedAt;
    this._verifiedBy = props.verifiedBy;
    this._rejectionReason = props.rejectionReason;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._fileName || this._fileName.trim().length === 0) {
      throw new ValidationError('File name is required', 'fileName');
    }
    if (this._fileName.length > 255) {
      throw new ValidationError('File name cannot exceed 255 chars', 'fileName');
    }
    if (this._type.requiresExpiry() && !this._expiresAt) {
      throw new ValidationError(
        `Document type "${this._type.value}" requires an expiry date`,
        'expiresAt',
      );
    }
  }

  get vendorId(): string { return this._vendorId; }
  get type(): DocumentTypeVO { return this._type; }
  get status(): DocumentStatusVO { return this._status; }
  get fileUrl(): DocumentUrlVO { return this._fileUrl; }
  get fileName(): string { return this._fileName; }
  get mimeType(): DocumentMimeTypeVO { return this._mimeType; }
  get fileSize(): DocumentFileSizeVO { return this._fileSize; }
  get documentNumber(): string | undefined { return this._documentNumber; }
  get issuedAt(): string | undefined { return this._issuedAt; }
  get expiresAt(): string | undefined { return this._expiresAt; }
  get verifiedAt(): string | undefined { return this._verifiedAt; }
  get verifiedBy(): string | undefined { return this._verifiedBy; }
  get rejectionReason(): string | undefined { return this._rejectionReason; }
  get notes(): string | undefined { return this._notes; }

  isExpired(at: Date = new Date()): boolean {
    if (!this._expiresAt) return false;
    return at.getTime() > Date.parse(this._expiresAt);
  }

  isExpiringSoon(daysThreshold: number = 30, at: Date = new Date()): boolean {
    if (!this._expiresAt) return false;
    const diff = Date.parse(this._expiresAt) - at.getTime();
    const days = diff / (24 * 60 * 60 * 1000);
    return days >= 0 && days <= daysThreshold;
  }

  isValid(): boolean {
    return this._status.isVerified() && !this.isExpired();
  }

  verify(verifiedBy: string, now: string = new Date().toISOString()): void {
    if (!this._status.isPending() && !this._status.isResubmitted()) {
      throw new BusinessRuleError(
        `Cannot verify document in status "${this._status.value}"`,
        'DOCUMENT_NOT_VERIFIABLE',
        { documentId: this.id, status: this._status.value },
      );
    }
    if (this.isExpired()) {
      throw new BusinessRuleError(
        'Cannot verify an expired document',
        'DOCUMENT_EXPIRED',
        { documentId: this.id, expiresAt: this._expiresAt },
      );
    }
    this._status = DocumentStatusVO.verified();
    this._verifiedAt = now;
    this._verifiedBy = verifiedBy;
    this._rejectionReason = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    if (!this._status.isPending() && !this._status.isResubmitted()) {
      throw new BusinessRuleError(
        `Cannot reject document in status "${this._status.value}"`,
        'DOCUMENT_NOT_REJECTABLE',
        { documentId: this.id, status: this._status.value },
      );
    }
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Rejection reason is required', 'rejectionReason');
    }
    if (reason.length > 500) {
      throw new ValidationError('Rejection reason cannot exceed 500 chars', 'rejectionReason');
    }
    this._status = DocumentStatusVO.rejected();
    this._rejectionReason = reason.trim();
    this._verifiedAt = undefined;
    this._verifiedBy = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  resubmit(fileUrl: DocumentUrlVO, now: string = new Date().toISOString()): void {
    if (!this._status.isRejected()) {
      throw new BusinessRuleError(
        `Cannot resubmit document in status "${this._status.value}"`,
        'DOCUMENT_NOT_RESUBMITTABLE',
        { documentId: this.id, status: this._status.value },
      );
    }
    if (!(fileUrl instanceof DocumentUrlVO)) {
      throw new ValidationError('File URL must be DocumentUrlVO', 'fileUrl');
    }
    this._status = DocumentStatusVO.resubmitted();
    this._fileUrl = fileUrl;
    this._rejectionReason = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  markExpired(now: string = new Date().toISOString()): void {
    if (!this._status.isVerified()) return;
    this._status = DocumentStatusVO.expired();
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: Omit<VendorDocumentEntityProps, 'status'>;
    now: string;
  }): VendorDocumentEntity {
    return new VendorDocumentEntity(params.id, params.now, params.now, {
      ...params.props,
      status: DocumentStatusVO.pending(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorDocumentEntityProps;
    deletedAt?: string | null;
  }): VendorDocumentEntity {
    return new VendorDocumentEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
