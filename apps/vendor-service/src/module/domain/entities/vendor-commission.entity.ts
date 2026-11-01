/**
 * VendorCommissionEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import {
  VendorCommissionVO,
  type VendorCommissionVOProps,
} from '../value-objects/composites/vendor-commission.vo.js';
import { CommissionRateVO } from '../value-objects/primitives/commission-rate.vo.js';

export interface VendorCommissionEntityProps {
  readonly vo: VendorCommissionVO;
}

export class VendorCommissionEntity extends BaseEntity<string> {
  private _vo: VendorCommissionVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorCommissionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorCommissionVO { return this._vo; }
  get commissionId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get type() { return this._vo.type; }
  get rate() { return this._vo.rate; }
  get fixedAmount(): number | undefined { return this._vo.fixedAmount; }
  get minAmount(): number | undefined { return this._vo.minAmount; }
  get maxAmount(): number | undefined { return this._vo.maxAmount; }
  get effectiveFrom(): string { return this._vo.effectiveFrom; }
  get effectiveTo(): string | undefined { return this._vo.effectiveTo; }
  get isActive(): boolean { return this._vo.isActive; }
  get daysRemaining(): number | null { return this._vo.daysRemaining; }

  // ═══ Predicates ═══
  isPercentage(): boolean { return this._vo.isPercentage(); }
  isFixed(): boolean { return this._vo.isFixed(); }
  isHybrid(): boolean { return this._vo.isHybrid(); }
  isCurrentlyActive(): boolean { return this._vo.isCurrentlyActive(); }
  isExpired(): boolean { return this._vo.isExpired(); }

  // ═══ Business Actions ═══
  updateRate(newRate: CommissionRateVO, now: string = new Date().toISOString()): void {
    if (this.isExpired()) {
      throw new BusinessRuleError(
        'Cannot update rate on expired commission',
        'COMMISSION_EXPIRED',
        { commissionId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorCommissionVO.create({ ...current, rate: newRate });
    this.touch(now);
  }

  activate(now: string = new Date().toISOString()): void {
    if (this.isActive) return;
    const current = this._vo.value;
    this._vo = VendorCommissionVO.create({ ...current, isActive: true });
    this.touch(now);
  }

  deactivate(now: string = new Date().toISOString()): void {
    if (!this.isActive) return;
    const current = this._vo.value;
    this._vo = VendorCommissionVO.create({ ...current, isActive: false });
    this.touch(now);
  }

  setEndDate(endDate: string, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorCommissionVO.create({ ...current, effectiveTo: endDate });
    this.touch(now);
  }

  /**
   * Calculate commission for an order amount.
   */
  calculate(orderAmount: number, categoryId?: string): number {
    return this._vo.calculate(orderAmount, categoryId);
  }

  /**
   * Net payout after commission.
   */
  netPayout(orderAmount: number, categoryId?: string): number {
    return this._vo.netPayout(orderAmount, categoryId);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorCommissionVO;
    now: string;
  }): VendorCommissionEntity {
    return new VendorCommissionEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorCommissionEntityProps;
  }): VendorCommissionEntity {
    return new VendorCommissionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
