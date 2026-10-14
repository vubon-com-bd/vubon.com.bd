/**
 * VendorSettlementVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Periodic settlement batch for a vendor।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SETTLEMENT } from '@vubon/shared-constants/business';

import { SettlementIdVO } from '../primitives/settlement-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { SettlementStatusVO } from '../primitives/settlement-status.vo.js';

export interface VendorSettlementVOProps {
  readonly id: SettlementIdVO;
  readonly vendorId: VendorIdVO;
  readonly status: SettlementStatusVO;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly grossAmount: number;
  readonly commissionAmount: number;
  readonly refundAmount: number;
  readonly adjustmentAmount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly orderCount: number;
  readonly payoutId?: string;
  readonly processedAt?: string;
  readonly completedAt?: string;
  readonly failedReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorSettlementVO extends BaseVO<VendorSettlementVOProps> {
  private constructor(props: VendorSettlementVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorSettlementVOProps): VendorSettlementVO {
    const vo = new VendorSettlementVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorSettlementVOProps): VendorSettlementVO {
    return new VendorSettlementVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (new Date(v.periodStart) >= new Date(v.periodEnd)) {
      throw new ValidationError('periodStart must be before periodEnd', 'periodEnd');
    }

    for (const [key, val] of Object.entries({
      grossAmount: v.grossAmount,
      commissionAmount: v.commissionAmount,
      refundAmount: v.refundAmount,
      netAmount: v.netAmount,
    })) {
      if (!Number.isFinite(val) || val < 0) {
        throw new ValidationError(`${key} must be a non-negative finite number`, key);
      }
    }

    if (!Number.isFinite(v.adjustmentAmount)) {
      throw new ValidationError('adjustmentAmount must be finite', 'adjustmentAmount');
    }

    if (!Number.isInteger(v.orderCount) || v.orderCount < 0) {
      throw new ValidationError('orderCount must be a non-negative integer', 'orderCount');
    }

    if (!v.currency || v.currency.length !== 3) {
      throw new ValidationError('currency must be a 3-char ISO code', 'currency');
    }

    // Reconcile: netAmount = gross - commission - refund + adjustment
    const expected = v.grossAmount - v.commissionAmount - v.refundAmount + v.adjustmentAmount;
    if (Math.abs(expected - v.netAmount) > 0.01) {
      throw new ValidationError(
        `netAmount mismatch: expected ${expected.toFixed(2)}, got ${v.netAmount.toFixed(2)}`,
        'netAmount',
      );
    }

    if (v.status.isCompleted() && !v.completedAt) {
      throw new ValidationError('Completed settlement must have completedAt', 'completedAt');
    }
    if (v.status.isFailed() && !v.failedReason) {
      throw new ValidationError('Failed settlement must have failedReason', 'failedReason');
    }

    if (v.notes && v.notes.length > 1000) {
      throw new ValidationError('notes max 1000 chars', 'notes');
    }
  }

  // ─── Getters ───
  get id(): SettlementIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get status(): SettlementStatusVO { return this.value.status; }
  get periodStart(): string { return this.value.periodStart; }
  get periodEnd(): string { return this.value.periodEnd; }
  get grossAmount(): number { return this.value.grossAmount; }
  get commissionAmount(): number { return this.value.commissionAmount; }
  get refundAmount(): number { return this.value.refundAmount; }
  get adjustmentAmount(): number { return this.value.adjustmentAmount; }
  get netAmount(): number { return this.value.netAmount; }
  get currency(): string { return this.value.currency; }
  get orderCount(): number { return this.value.orderCount; }
  get payoutId(): string | undefined { return this.value.payoutId; }
  get processedAt(): string | undefined { return this.value.processedAt; }
  get completedAt(): string | undefined { return this.value.completedAt; }
  get failedReason(): string | undefined { return this.value.failedReason; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isPending(): boolean { return this.status.isPending(); }
  isProcessing(): boolean { return this.status.isProcessing(); }
  isCompleted(): boolean { return this.status.isCompleted(); }
  isFailed(): boolean { return this.status.isFailed(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isOnHold(): boolean { return this.status.isOnHold(); }

  isFinal(): boolean { return this.status.isFinal(); }
  isSuccessful(): boolean { return this.status.isSuccessful(); }
  isInProgress(): boolean { return this.status.isInProgress(); }

  hasPayout(): boolean { return this.payoutId !== undefined; }
  hasNotes(): boolean { return this.notes !== undefined; }
  hasAdjustment(): boolean { return this.adjustmentAmount !== 0; }
  hasRefunds(): boolean { return this.refundAmount > 0; }

  /** Period length in days */
  get periodDays(): number {
    const diff = new Date(this.periodEnd).getTime() - new Date(this.periodStart).getTime();
    return Math.round(diff / (1000 * 60 * 60 * 24));
  }

  /** Average order value in the period */
  get averageOrderValue(): number {
    if (this.orderCount === 0) return 0;
    return Math.round((this.grossAmount / this.orderCount) * 100) / 100;
  }

  /** Effective commission rate (as percent) */
  get effectiveCommissionRate(): number {
    if (this.grossAmount === 0) return 0;
    return Math.round((this.commissionAmount / this.grossAmount) * 10000) / 100;
  }

  /** Meets minimum settlement amount */
  meetsMinimum(): boolean {
    return this.netAmount >= VENDOR_SETTLEMENT.MIN_AMOUNT;
  }

  /** Is overdue (pending/processing beyond SLA) */
  isOverdue(): boolean {
    if (!this.isPending() && !this.isProcessing()) return false;
    const ageHours = (Date.now() - new Date(this.createdAt).getTime()) / (1000 * 60 * 60);
    return ageHours > VENDOR_SETTLEMENT.PROCESSING_SLA_HOURS;
  }
}
