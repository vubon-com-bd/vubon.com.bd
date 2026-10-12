/**
 * VendorCommissionEntity — effective commission config + history
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_COMMISSION_TYPE } from '@vubon/shared-constants/business';
import { CommissionPercentVO } from '../value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../value-objects/primitives/commission-amount.vo.js';

export type CommissionTypeValue = (typeof VENDOR_COMMISSION_TYPE)[keyof typeof VENDOR_COMMISSION_TYPE];
const ALLOWED_TYPES = Object.values(VENDOR_COMMISSION_TYPE) as readonly string[];

export interface VendorCommissionEntityProps {
  readonly vendorId: string;
  readonly type: CommissionTypeValue;
  readonly percent: CommissionPercentVO;
  readonly fixedAmount?: CommissionAmountVO;
  readonly currency: string;
  readonly minPercent: number;
  readonly maxPercent: number;
  readonly applyOnShipping: boolean;
  readonly applyOnTax: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
  readonly isActive: boolean;
}

export class VendorCommissionEntity extends AggregateRoot<string> {
  private _type: CommissionTypeValue;
  private _percent: CommissionPercentVO;
  private _fixedAmount?: CommissionAmountVO;
  private _minPercent: number;
  private _maxPercent: number;
  private _applyOnShipping: boolean;
  private _applyOnTax: boolean;
  private _effectiveFrom: string;
  private _effectiveTo?: string;
  private _isActive: boolean;

  private readonly _vendorId: string;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorCommissionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._percent = props.percent;
    this._fixedAmount = props.fixedAmount;
    this._currency = props.currency;
    this._minPercent = props.minPercent;
    this._maxPercent = props.maxPercent;
    this._applyOnShipping = props.applyOnShipping;
    this._applyOnTax = props.applyOnTax;
    this._effectiveFrom = props.effectiveFrom;
    this._effectiveTo = props.effectiveTo;
    this._isActive = props.isActive;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!ALLOWED_TYPES.includes(this._type)) {
      throw new ValidationError(`Invalid commission type "${this._type}"`, 'type');
    }
    if (this._minPercent < 0 || this._maxPercent > 100 || this._minPercent > this._maxPercent) {
      throw new ValidationError('Invalid percent bounds', 'percent');
    }
    if (this._percent.value < this._minPercent || this._percent.value > this._maxPercent) {
      throw new ValidationError('Percent is outside allowed bounds', 'percent');
    }
    if ((this._type === VENDOR_COMMISSION_TYPE.FIXED || this._type === VENDOR_COMMISSION_TYPE.HYBRID) && !this._fixedAmount) {
      throw new ValidationError(`Commission type "${this._type}" requires fixedAmount`, 'fixedAmount');
    }
    if (this._effectiveTo && Date.parse(this._effectiveTo) <= Date.parse(this._effectiveFrom)) {
      throw new ValidationError('effectiveTo must be after effectiveFrom', 'effectiveTo');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get type(): CommissionTypeValue { return this._type; }
  get percent(): CommissionPercentVO { return this._percent; }
  get fixedAmount(): CommissionAmountVO | undefined { return this._fixedAmount; }
  get currency(): string { return this._currency; }

  get applyOnShipping(): boolean { return this._applyOnShipping; }
  get applyOnTax(): boolean { return this._applyOnTax; }
  get effectiveFrom(): string { return this._effectiveFrom; }
  get effectiveTo(): string | undefined { return this._effectiveTo; }
  get isActive(): boolean { return this._isActive; }

  get minPercent(): number { return this._minPercent; }
  get maxPercent(): number { return this._maxPercent; }

  /** Compute total commission from an order amount. */
  calculate(orderAmount: number): { percentPart: number; fixedPart: number; total: number } {
    if (!Number.isFinite(orderAmount) || orderAmount < 0) {
      throw new ValidationError('Order amount must be non-negative', 'orderAmount');
    }
    const percentPart = this._percent.applyTo(orderAmount);
    const fixedPart = this._fixedAmount?.amount ?? 0;
    const total = Math.round((percentPart + fixedPart) * 100) / 100;
    return { percentPart, fixedPart, total };
  }

  isCurrentlyEffective(at: Date = new Date()): boolean {
    if (!this._isActive) return false;
    const t = at.getTime();
    const from = Date.parse(this._effectiveFrom);
    const to = this._effectiveTo ? Date.parse(this._effectiveTo) : Number.POSITIVE_INFINITY;
    return t >= from && t < to;
  }

  isPercentage(): boolean { return this._type === VENDOR_COMMISSION_TYPE.PERCENTAGE; }
  isFixed(): boolean { return this._type === VENDOR_COMMISSION_TYPE.FIXED; }
  isHybrid(): boolean { return this._type === VENDOR_COMMISSION_TYPE.HYBRID; }
  isTiered(): boolean { return this._type === VENDOR_COMMISSION_TYPE.TIERED; }
  isCategoryBased(): boolean { return this._type === VENDOR_COMMISSION_TYPE.CATEGORY_BASED; }

  updatePercent(percent: CommissionPercentVO, now: string = new Date().toISOString()): void {
    if (percent.value < this._minPercent || percent.value > this._maxPercent) {
      throw new ValidationError('New percent is outside allowed bounds', 'percent');
    }
    this._percent = percent;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  updateFixedAmount(amount: CommissionAmountVO, now: string = new Date().toISOString()): void {
    if (amount.currency !== this._currency) {
      throw new ValidationError('Fixed amount currency must match commission currency', 'fixedAmount');
    }
    this._fixedAmount = amount;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  toggleShipping(apply: boolean, now: string = new Date().toISOString()): void {
    this._applyOnShipping = apply;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  toggleTax(apply: boolean, now: string = new Date().toISOString()): void {
    this._applyOnTax = apply;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  activate(now: string = new Date().toISOString()): void {
    this._isActive = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  deactivate(now: string = new Date().toISOString()): void {
    if (this._isActive) {
      this._isActive = false;
      (this as unknown as { updatedAt: string }).updatedAt = now;
      this.incrementVersion();
    }
  }

  terminateAt(when: string, now: string = new Date().toISOString()): void {
    if (Date.parse(when) <= Date.parse(this._effectiveFrom)) {
      throw new BusinessRuleError('effectiveTo must be after effectiveFrom', 'INVALID_EFFECTIVE_TO', { id: this.id });
    }
    this._effectiveTo = when;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    vendorId: string;
    type: CommissionTypeValue;
    percent: CommissionPercentVO;
    fixedAmount?: CommissionAmountVO;
    currency: string;
    minPercent: number;
    maxPercent: number;
    applyOnShipping: boolean;
    applyOnTax: boolean;
    effectiveFrom?: string;
    now: string;
  }): VendorCommissionEntity {
    return new VendorCommissionEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      type: params.type,
      percent: params.percent,
      fixedAmount: params.fixedAmount,
      currency: params.currency.toUpperCase(),
      minPercent: params.minPercent,
      maxPercent: params.maxPercent,
      applyOnShipping: params.applyOnShipping,
      applyOnTax: params.applyOnTax,
      effectiveFrom: params.effectiveFrom ?? params.now,
      isActive: true,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorCommissionEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorCommissionEntity {
    const entity = new VendorCommissionEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
