/**
 * VendorPayoutEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorPayoutVO,
  type VendorPayoutVOProps,
} from '../value-objects/composites/vendor-payout.vo.js';
import { PayoutStatusVO } from '../value-objects/primitives/payout-status.vo.js';

export interface VendorPayoutEntityProps {
  readonly vo: VendorPayoutVO;
}

export class VendorPayoutEntity extends BaseEntity<string> {
  private _vo: VendorPayoutVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorPayoutEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorPayoutVO { return this._vo; }
  get payoutId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get bankAccountId() { return this._vo.bankAccountId; }
  get amount() { return this._vo.amount; }
  get fee(): number { return this._vo.fee; }
  get netAmount(): number { return this._vo.netAmount; }
  get currency(): string { return this._vo.currency; }
  get method() { return this._vo.method; }
  get status() { return this._vo.status; }
  get requestedAt(): string { return this._vo.requestedAt; }
  get processedAt(): string | undefined { return this._vo.processedAt; }
  get paidAt(): string | undefined { return this._vo.paidAt; }
  get transactionId(): string | undefined { return this._vo.transactionId; }
  get rejectionReason(): string | undefined { return this._vo.rejectionReason; }
  get failureReason(): string | undefined { return this._vo.failureReason; }
  get processingHours(): number | null { return this._vo.processingHours; }
  get ageInDays(): number { return this._vo.ageInDays; }

  // ═══ Predicates ═══
  isPending(): boolean { return this._vo.isPending(); }
  isProcessing(): boolean { return this._vo.isProcessing(); }
  isApproved(): boolean { return this._vo.isApproved(); }
  isPaid(): boolean { return this._vo.isPaid(); }
  isFailed(): boolean { return this._vo.isFailed(); }
  isRejected(): boolean { return this._vo.isRejected(); }
  isCancelled(): boolean { return this._vo.isCancelled(); }
  isOnHold(): boolean { return this._vo.isOnHold(); }
  isFinal(): boolean { return this._vo.isFinal(); }
  isSuccessful(): boolean { return this._vo.isSuccessful(); }
  isOverdue(): boolean { return this._vo.isOverdue(); }
  canBeCancelled(): boolean { return this._vo.canBeCancelled(); }

  // ═══ Business Actions ═══
  startProcessing(processedBy?: string, now: string = new Date().toISOString()): void {
    if (!this.isPending()) {
      throw new BusinessRuleError(
        `Cannot start processing payout in status "${this.status.value}"`,
        'PAYOUT_CANNOT_BE_PROCESSED',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.processing(),
      processedAt: now,
      completedBy: processedBy,
    });
    this.touch(now);
  }

  approve(approvedBy: string, notes?: string, now: string = new Date().toISOString()): void {
    if (!this.isProcessing()) {
      throw new BusinessRuleError(
        `Cannot approve payout in status "${this.status.value}"`,
        'PAYOUT_CANNOT_BE_APPROVED',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.approved(),
      completedBy: approvedBy,
      notes: notes ?? current.notes,
    });
    this.touch(now);
  }

  markPaid(
    transactionId: string,
    paidBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!transactionId || transactionId.trim().length === 0) {
      throw new ValidationError('transactionId is required', 'transactionId');
    }
    if (!this.isApproved() && !this.isProcessing()) {
      throw new BusinessRuleError(
        `Cannot mark payout as paid in status "${this.status.value}"`,
        'PAYOUT_CANNOT_BE_PAID',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.paid(),
      paidAt: now,
      transactionId,
      completedBy: paidBy ?? current.completedBy,
    });
    this.touch(now);
  }

  fail(reason: string, failureCode?: string, now: string = new Date().toISOString()): void {
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Failure reason is required', 'failureReason');
    }
    if (!this.isProcessing() && !this.isApproved()) {
      throw new BusinessRuleError(
        `Cannot mark payout as failed in status "${this.status.value}"`,
        'PAYOUT_CANNOT_BE_FAILED',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.failed(),
      failureReason: reason,
      notes: failureCode ?? current.notes,
    });
    this.touch(now);
  }

  reject(reason: string, rejectedBy: string, now: string = new Date().toISOString()): void {
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Rejection reason is required', 'rejectionReason');
    }
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot reject a final payout (status: ${this.status.value})`,
        'PAYOUT_ALREADY_PROCESSED',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.rejected(),
      rejectionReason: reason,
      completedBy: rejectedBy,
    });
    this.touch(now);
  }

  cancel(cancelledBy?: string, reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel payout in status "${this.status.value}"`,
        'PAYOUT_CANNOT_BE_CANCELLED',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.cancelled(),
      completedBy: cancelledBy,
      notes: reason ?? current.notes,
    });
    this.touch(now);
  }

  putOnHold(reason: string, heldBy: string, now: string = new Date().toISOString()): void {
    if (!this.isPending() && !this.isProcessing()) {
      throw new BusinessRuleError(
        `Cannot put payout on hold in status "${this.status.value}"`,
        'PAYOUT_CANNOT_BE_ON_HOLD',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.onHold(),
      notes: reason,
      completedBy: heldBy,
    });
    this.touch(now);
  }

  release(now: string = new Date().toISOString()): void {
    if (!this.isOnHold()) {
      throw new BusinessRuleError(
        `Cannot release payout in status "${this.status.value}"`,
        'PAYOUT_NOT_ON_HOLD',
        { payoutId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorPayoutVO.create({
      ...current,
      status: PayoutStatusVO.processing(),
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorPayoutVO;
    now: string;
  }): VendorPayoutEntity {
    return new VendorPayoutEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorPayoutEntityProps;
  }): VendorPayoutEntity {
    return new VendorPayoutEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
