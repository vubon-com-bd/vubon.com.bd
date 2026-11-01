/**
 * VendorSettlementEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorSettlementVO,
  type VendorSettlementVOProps,
} from '../value-objects/composites/vendor-settlement.vo.js';
import { SettlementStatusVO } from '../value-objects/primitives/settlement-status.vo.js';

export interface VendorSettlementEntityProps {
  readonly vo: VendorSettlementVO;
}

export class VendorSettlementEntity extends BaseEntity<string> {
  private _vo: VendorSettlementVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSettlementEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorSettlementVO { return this._vo; }
  get settlementId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get status() { return this._vo.status; }
  get periodStart(): string { return this._vo.periodStart; }
  get periodEnd(): string { return this._vo.periodEnd; }
  get grossAmount(): number { return this._vo.grossAmount; }
  get commissionAmount(): number { return this._vo.commissionAmount; }
  get refundAmount(): number { return this._vo.refundAmount; }
  get adjustmentAmount(): number { return this._vo.adjustmentAmount; }
  get netAmount(): number { return this._vo.netAmount; }
  get currency(): string { return this._vo.currency; }
  get orderCount(): number { return this._vo.orderCount; }
  get payoutId(): string | undefined { return this._vo.payoutId; }
  get periodDays(): number { return this._vo.periodDays; }
  get averageOrderValue(): number { return this._vo.averageOrderValue; }
  get effectiveCommissionRate(): number { return this._vo.effectiveCommissionRate; }
  get completedAt(): string | undefined { return this._vo.completedAt; }
  get failedReason(): string | undefined { return this._vo.failedReason; }

  // ═══ Predicates ═══
  isPending(): boolean { return this._vo.isPending(); }
  isProcessing(): boolean { return this._vo.isProcessing(); }
  isCompleted(): boolean { return this._vo.isCompleted(); }
  isFailed(): boolean { return this._vo.isFailed(); }
  isCancelled(): boolean { return this._vo.isCancelled(); }
  isOnHold(): boolean { return this._vo.isOnHold(); }
  isFinal(): boolean { return this._vo.isFinal(); }
  isOverdue(): boolean { return this._vo.isOverdue(); }
  meetsMinimum(): boolean { return this._vo.meetsMinimum(); }

  // ═══ Business Actions ═══
  startProcessing(processedBy?: string, now: string = new Date().toISOString()): void {
    if (!this.isPending()) {
      throw new BusinessRuleError(
        `Cannot start processing settlement in status "${this.status.value}"`,
        'SETTLEMENT_CANNOT_BE_PROCESSED',
        { settlementId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSettlementVO.create({
      ...current,
      status: SettlementStatusVO.processing(),
      processedAt: now,
    });
    this.touch(now);
  }

  complete(payoutId?: string, now: string = new Date().toISOString()): void {
    if (!this.isProcessing()) {
      throw new BusinessRuleError(
        `Cannot complete settlement in status "${this.status.value}"`,
        'SETTLEMENT_CANNOT_BE_COMPLETED',
        { settlementId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSettlementVO.create({
      ...current,
      status: SettlementStatusVO.completed(),
      completedAt: now,
      payoutId: payoutId ?? current.payoutId,
    });
    this.touch(now);
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Failure reason is required', 'failedReason');
    }
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot fail a final settlement (status: ${this.status.value})`,
        'SETTLEMENT_CANNOT_BE_FAILED',
        { settlementId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSettlementVO.create({
      ...current,
      status: SettlementStatusVO.failed(),
      failedReason: reason,
    });
    this.touch(now);
  }

  cancel(cancelledBy?: string, reason?: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot cancel a final settlement (status: ${this.status.value})`,
        'SETTLEMENT_CANNOT_BE_CANCELLED',
        { settlementId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSettlementVO.create({
      ...current,
      status: SettlementStatusVO.cancelled(),
      notes: reason ?? current.notes,
    });
    this.touch(now);
  }

  putOnHold(reason: string, heldBy: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot put settlement on hold in status "${this.status.value}"`,
        'SETTLEMENT_CANNOT_BE_ON_HOLD',
        { settlementId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSettlementVO.create({
      ...current,
      status: SettlementStatusVO.onHold(),
      notes: reason,
    });
    this.touch(now);
  }

  release(now: string = new Date().toISOString()): void {
    if (!this.isOnHold()) {
      throw new BusinessRuleError(
        `Cannot release settlement in status "${this.status.value}"`,
        'SETTLEMENT_NOT_ON_HOLD',
        { settlementId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSettlementVO.create({
      ...current,
      status: SettlementStatusVO.processing(),
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorSettlementVO;
    now: string;
  }): VendorSettlementEntity {
    return new VendorSettlementEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorSettlementEntityProps;
  }): VendorSettlementEntity {
    return new VendorSettlementEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
