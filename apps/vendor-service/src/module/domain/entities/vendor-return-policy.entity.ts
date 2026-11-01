/**
 * VendorReturnPolicyEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorReturnPolicyVO,
  type VendorReturnPolicyVOProps,
} from '../value-objects/composites/vendor-return-policy.vo.js';

export interface VendorReturnPolicyEntityProps {
  readonly vo: VendorReturnPolicyVO;
}

export class VendorReturnPolicyEntity extends BaseEntity<string> {
  private _vo: VendorReturnPolicyVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorReturnPolicyEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorReturnPolicyVO { return this._vo; }
  get vendorId() { return this._vo.vendorId; }
  get type() { return this._vo.type; }
  get windowDays(): number { return this._vo.windowDays; }
  get isFreeReturn(): boolean { return this._vo.isFreeReturn; }
  get restockFeePercent(): number { return this._vo.restockFeePercent; }
  get requireReason(): boolean { return this._vo.requireReason; }
  get requireImages(): boolean { return this._vo.requireImages; }
  get maxImages(): number { return this._vo.maxImages; }
  get autoApprove(): boolean { return this._vo.autoApprove; }
  get approvalSlaHours(): number { return this._vo.approvalSlaHours; }
  get excludedCategories(): readonly string[] { return this._vo.excludedCategories; }
  get windowLabel(): string { return this._vo.windowLabel; }

  // ═══ Predicates ═══
  isNoReturn(): boolean { return this._vo.isNoReturn(); }
  isFullReturn(): boolean { return this._vo.isFullReturn(); }
  isExchangeOnly(): boolean { return this._vo.isExchangeOnly(); }
  isPartialReturn(): boolean { return this._vo.isPartialReturn(); }
  isConditional(): boolean { return this._vo.isConditional(); }
  allowsReturn(): boolean { return this._vo.allowsReturn(); }
  issuesRefund(): boolean { return this._vo.issuesRefund(); }
  requiresApproval(): boolean { return this._vo.requiresApproval(); }
  hasRestockFee(): boolean { return this._vo.hasRestockFee(); }

  // ═══ Business Logic ═══
  isWithinWindow(daysSincePurchase: number): boolean {
    return this._vo.isWithinWindow(daysSincePurchase);
  }

  isCategoryExcluded(categoryId: string): boolean {
    return this._vo.isCategoryExcluded(categoryId);
  }

  calculateRefund(orderAmount: number): number {
    return this._vo.calculateRefund(orderAmount);
  }

  // ═══ Business Actions ═══
  setWindowDays(days: number, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorReturnPolicyVO.create({ ...current, windowDays: days });
    this.touch(now);
  }

  setRestockFee(percent: number, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorReturnPolicyVO.create({
      ...current,
      restockFeePercent: percent,
      isFreeReturn: percent === 0,
    });
    this.touch(now);
  }

  addExcludedCategory(categoryId: string, now: string = new Date().toISOString()): void {
    if (this.excludedCategories.includes(categoryId)) return;
    const current = this._vo.value;
    this._vo = VendorReturnPolicyVO.create({
      ...current,
      excludedCategories: [...current.excludedCategories, categoryId],
    });
    this.touch(now);
  }

  removeExcludedCategory(categoryId: string, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorReturnPolicyVO.create({
      ...current,
      excludedCategories: current.excludedCategories.filter((c) => c !== categoryId),
    });
    this.touch(now);
  }

  enableAutoApprove(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorReturnPolicyVO.create({ ...current, autoApprove: true });
    this.touch(now);
  }

  disableAutoApprove(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorReturnPolicyVO.create({ ...current, autoApprove: false });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorReturnPolicyVO;
    now: string;
  }): VendorReturnPolicyEntity {
    return new VendorReturnPolicyEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorReturnPolicyEntityProps;
  }): VendorReturnPolicyEntity {
    return new VendorReturnPolicyEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
