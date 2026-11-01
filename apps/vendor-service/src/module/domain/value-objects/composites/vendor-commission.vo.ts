/**
 * VendorCommissionVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor commission configuration।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/business';

import { CommissionIdVO } from '../primitives/commission-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { CommissionTypeVO } from '../primitives/commission-type.vo.js';
import { CommissionRateVO } from '../primitives/commission-rate.vo.js';

export interface VendorCommissionVOProps {
  readonly id: CommissionIdVO;
  readonly vendorId: VendorIdVO;
  readonly type: CommissionTypeVO;
  readonly rate: CommissionRateVO;
  readonly fixedAmount?: number;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly categoryOverrides?: Readonly<Record<string, number>>;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorCommissionVO extends BaseVO<VendorCommissionVOProps> {
  private constructor(props: VendorCommissionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorCommissionVOProps): VendorCommissionVO {
    const vo = new VendorCommissionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorCommissionVOProps): VendorCommissionVO {
    return new VendorCommissionVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.type.usesFixed()) {
      if (v.fixedAmount === undefined) {
        throw new ValidationError('fixedAmount required for fixed/hybrid commission', 'fixedAmount');
      }
      if (v.fixedAmount < VENDOR_COMMISSION.MIN_FIXED || v.fixedAmount > VENDOR_COMMISSION.MAX_FIXED) {
        throw new ValidationError(
          `fixedAmount must be between ${VENDOR_COMMISSION.MIN_FIXED} and ${VENDOR_COMMISSION.MAX_FIXED}`,
          'fixedAmount',
        );
      }
    }

    if (v.minAmount !== undefined && v.minAmount < 0) {
      throw new ValidationError('minAmount must be non-negative', 'minAmount');
    }
    if (v.maxAmount !== undefined && v.maxAmount < 0) {
      throw new ValidationError('maxAmount must be non-negative', 'maxAmount');
    }
    if (v.minAmount !== undefined && v.maxAmount !== undefined && v.minAmount > v.maxAmount) {
      throw new ValidationError('minAmount cannot exceed maxAmount', 'maxAmount');
    }

    if (v.categoryOverrides) {
      for (const [cat, pct] of Object.entries(v.categoryOverrides)) {
        if (!cat || cat.length === 0) {
          throw new ValidationError('categoryOverrides keys cannot be empty', 'categoryOverrides');
        }
        if (pct < VENDOR_COMMISSION.MIN_PERCENT || pct > VENDOR_COMMISSION.MAX_PERCENT) {
          throw new ValidationError(
            `categoryOverrides["${cat}"] must be ${VENDOR_COMMISSION.MIN_PERCENT}-${VENDOR_COMMISSION.MAX_PERCENT}`,
            'categoryOverrides',
          );
        }
      }
    }

    if (v.effectiveTo && new Date(v.effectiveFrom) >= new Date(v.effectiveTo)) {
      throw new ValidationError('effectiveFrom must be before effectiveTo', 'effectiveTo');
    }
  }

  // ─── Getters ───
  get id(): CommissionIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): CommissionTypeVO { return this.value.type; }
  get rate(): CommissionRateVO { return this.value.rate; }
  get fixedAmount(): number | undefined { return this.value.fixedAmount; }
  get minAmount(): number | undefined { return this.value.minAmount; }
  get maxAmount(): number | undefined { return this.value.maxAmount; }
  get categoryOverrides(): Readonly<Record<string, number>> | undefined { return this.value.categoryOverrides; }
  get effectiveFrom(): string { return this.value.effectiveFrom; }
  get effectiveTo(): string | undefined { return this.value.effectiveTo; }
  get isActive(): boolean { return this.value.isActive; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isPercentage(): boolean { return this.type.isPercentage(); }
  isFixed(): boolean { return this.type.isFixed(); }
  isTiered(): boolean { return this.type.isTiered(); }
  isHybrid(): boolean { return this.type.isHybrid(); }
  isCategoryBased(): boolean { return this.type.isCategoryBased(); }

  hasFixedAmount(): boolean { return this.fixedAmount !== undefined; }
  hasMinAmount(): boolean { return this.minAmount !== undefined; }
  hasMaxAmount(): boolean { return this.maxAmount !== undefined; }
  hasCategoryOverrides(): boolean { return this.categoryOverrides !== undefined; }
  hasEndDate(): boolean { return this.effectiveTo !== undefined; }

  /** Currently in effect based on dates + isActive flag */
  isCurrentlyActive(): boolean {
    if (!this.isActive) return false;
    const now = Date.now();
    if (now < new Date(this.effectiveFrom).getTime()) return false;
    if (this.effectiveTo && now > new Date(this.effectiveTo).getTime()) return false;
    return true;
  }

  /** Expired based on date */
  isExpired(): boolean {
    if (!this.effectiveTo) return false;
    return Date.now() > new Date(this.effectiveTo).getTime();
  }

  /** Days remaining in effect */
  get daysRemaining(): number | null {
    if (!this.effectiveTo) return null;
    const diff = new Date(this.effectiveTo).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  /**
   * Calculate commission for a given order amount + optional category.
   * Returns rounded amount (2 decimals).
   */
  calculate(orderAmount: number, categoryId?: string): number {
    if (!Number.isFinite(orderAmount) || orderAmount < 0) {
      throw new ValidationError('orderAmount must be a non-negative finite number', 'orderAmount');
    }

    // Category override takes priority
    if (categoryId && this.categoryOverrides && this.categoryOverrides[categoryId] !== undefined) {
      const pct = this.categoryOverrides[categoryId]!;
      return Math.round(orderAmount * (pct / 100) * 100) / 100;
    }

    let amount = 0;

    if (this.type.isPercentage()) {
      amount = this.rate.apply(orderAmount);
    } else if (this.type.isFixed()) {
      amount = this.fixedAmount ?? 0;
    } else if (this.type.isHybrid()) {
      amount = this.rate.apply(orderAmount) + (this.fixedAmount ?? 0);
    } else if (this.type.isTiered()) {
      // Simplified: use rate as top tier value
      amount = this.rate.apply(orderAmount);
    } else if (this.type.isCategoryBased()) {
      amount = this.rate.apply(orderAmount);
    }

    // Apply min/max constraints
    if (this.minAmount !== undefined && amount < this.minAmount) amount = this.minAmount;
    if (this.maxAmount !== undefined && amount > this.maxAmount) amount = this.maxAmount;

    return Math.round(amount * 100) / 100;
  }

  /**
   * Calculate net payout after commission deduction.
   */
  netPayout(orderAmount: number, categoryId?: string): number {
    const commission = this.calculate(orderAmount, categoryId);
    return Math.round((orderAmount - commission) * 100) / 100;
  }
}
