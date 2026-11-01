/**
 * VendorDocumentEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorDocumentVO,
  type VendorDocumentVOProps,
} from '../value-objects/composites/vendor-document.vo.js';
import { DocumentStatusVO } from '../value-objects/primitives/document-status.vo.js';

export interface VendorDocumentEntityProps {
  readonly vo: VendorDocumentVO;
}

export class VendorDocumentEntity extends BaseEntity<string> {
  private _vo: VendorDocumentVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorDocumentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorDocumentVO { return this._vo; }
  get documentId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get type() { return this._vo.type; }
  get status() { return this._vo.status; }
  get fileUrl(): string { return this._vo.fileUrl; }
  get fileName(): string { return this._vo.fileName; }
  get fileSize(): number { return this._vo.fileSize; }
  get mimeType(): string { return this._vo.mimeType; }
  get issuedAt(): string | undefined { return this._vo.issuedAt; }
  get expiresAt(): string | undefined { return this._vo.expiresAt; }
  get uploadedAt(): string { return this._vo.uploadedAt; }
  get verifiedAt(): string | undefined { return this._vo.verifiedAt; }
  get verifiedBy(): string | undefined { return this._vo.verifiedBy; }
  get rejectionReason(): string | undefined { return this._vo.rejectionReason; }

  get fileSizeMB(): number { return this._vo.fileSizeMB; }
  get daysUntilExpiry(): number | null { return this._vo.daysUntilExpiry; }

  // ═══ Predicates ═══
  isPending(): boolean { return this._vo.isPending(); }
  isVerified(): boolean { return this._vo.isVerified(); }
  isRejected(): boolean { return this._vo.isRejected(); }
  isExpired(): boolean { return this._vo.isExpired(); }
  isResubmitted(): boolean { return this._vo.isResubmitted(); }
  isMandatory(): boolean { return this._vo.isMandatory(); }
  isReviewable(): boolean { return this._vo.isReviewable(); }
  canResubmit(): boolean { return this._vo.canResubmit(); }
  isExpiringSoon(days = 30): boolean { return this._vo.isExpiringSoon(days); }
  isExpiredByDate(): boolean { return this._vo.isExpiredByDate(); }

  // ═══ Business Actions ═══
  approve(verifiedBy: string, now: string = new Date().toISOString()): void {
    if (!this.isReviewable()) {
      throw new BusinessRuleError(
        `Cannot approve document in status "${this.status.value}"`,
        'DOCUMENT_CANNOT_BE_APPROVED',
        { documentId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorDocumentVO.create({
      ...current,
      status: DocumentStatusVO.verified(),
      verifiedAt: now,
      verifiedBy,
      rejectionReason: undefined,
    });
    this.touch(now);
  }

  reject(
    reason: string,
    rejectedBy: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Rejection reason is required', 'rejectionReason');
    }
    if (!this.isReviewable()) {
      throw new BusinessRuleError(
        `Cannot reject document in status "${this.status.value}"`,
        'DOCUMENT_CANNOT_BE_REJECTED',
        { documentId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorDocumentVO.create({
      ...current,
      status: DocumentStatusVO.rejected(),
      rejectionReason: reason,
      verifiedBy: rejectedBy,
      verifiedAt: now,
    });
    this.touch(now);
  }

  markExpired(now: string = new Date().toISOString()): void {
    if (!this.isVerified()) return;
    if (!this.isExpiredByDate() && !this.isExpiringSoon(0)) return;
    const current = this._vo.value;
    this._vo = VendorDocumentVO.create({
      ...current,
      status: DocumentStatusVO.expired(),
    });
    this.touch(now);
  }

  resubmit(fileUrl: string, fileName: string, fileSize: number, now: string = new Date().toISOString()): void {
    if (!this.canResubmit()) {
      throw new BusinessRuleError(
        `Cannot resubmit document in status "${this.status.value}"`,
        'DOCUMENT_CANNOT_BE_RESUBMITTED',
        { documentId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorDocumentVO.create({
      ...current,
      status: DocumentStatusVO.resubmitted(),
      fileUrl,
      fileName,
      fileSize,
      uploadedAt: now,
      verifiedAt: undefined,
      verifiedBy: undefined,
      rejectionReason: undefined,
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorDocumentVO;
    now: string;
  }): VendorDocumentEntity {
    return new VendorDocumentEntity(
      params.id,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorDocumentEntityProps;
  }): VendorDocumentEntity {
    return new VendorDocumentEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
