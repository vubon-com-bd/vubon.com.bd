/**
 * VendorWarrantyEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorWarrantyVO,
  type VendorWarrantyVOProps,
} from '../value-objects/composites/vendor-warranty.vo.js';

export interface VendorWarrantyEntityProps {
  readonly vo: VendorWarrantyVO;
}

export class VendorWarrantyEntity extends BaseEntity<string> {
  private _vo: VendorWarrantyVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorWarrantyEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorWarrantyVO { return this._vo; }
  get vendorId() { return this._vo.vendorId; }
  get type() { return this._vo.type; }
  get periodDays(): number { return this._vo.periodDays; }
  get periodMonths(): number { return this._vo.periodMonths; }
  get periodYears(): number { return this._vo.periodYears; }
  get periodLabel(): string { return this._vo.periodLabel; }
  get requireProof(): boolean { return this._vo.requireProof; }
  get coverShipping(): boolean { return this._vo.coverShipping; }
  get autoRegister(): boolean { return this._vo.autoRegister; }
  get excludedCategories(): readonly string[] { return this._vo.excludedCategories; }
  get terms(): string | undefined { return this._vo.terms; }

  // ═══ Predicates ═══
  isNone(): boolean { return this._vo.isNone(); }
  isManufacturer(): boolean { return this._vo.isManufacturer(); }
  isSeller(): boolean { return this._vo.isSeller(); }
  isExtended(): boolean { return this._vo.isExtended(); }
  isInternational(): boolean { return this._vo.isInternational(); }
  isLimited(): boolean { return this._vo.isLimited(); }
  providesCoverage(): boolean { return this._vo.providesCoverage(); }
  isSellerBacked(): boolean { return this._vo.isSellerBacked(); }
  isManufacturerBacked(): boolean { return this._vo.isManufacturerBacked(); }
  hasLimitations(): boolean { return this._vo.hasLimitations(); }

  // ═══ Business Logic ═══
  isWithinWarranty(daysSincePurchase: number): boolean {
    return this._vo.isWithinWarranty(daysSincePurchase);
  }

  getRemainingDays(daysSincePurchase: number): number {
    return this._vo.getRemainingDays(daysSincePurchase);
  }

  isExpiringSoon(daysSincePurchase: number, threshold = 30): boolean {
    return this._vo.isExpiringSoon(daysSincePurchase, threshold);
  }

  isCategoryExcluded(categoryId: string): boolean {
    return this._vo.isCategoryExcluded(categoryId);
  }

  // ═══ Business Actions ═══
  setPeriod(days: number, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorWarrantyVO.create({ ...current, periodDays: days });
    this.touch(now);
  }

  enableShippingCoverage(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorWarrantyVO.create({ ...current, coverShipping: true });
    this.touch(now);
  }

  disableShippingCoverage(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorWarrantyVO.create({ ...current, coverShipping: false });
    this.touch(now);
  }

  addExcludedCategory(categoryId: string, now: string = new Date().toISOString()): void {
    if (this.excludedCategories.includes(categoryId)) return;
    const current = this._vo.value;
    this._vo = VendorWarrantyVO.create({
      ...current,
      excludedCategories: [...current.excludedCategories, categoryId],
    });
    this.touch(now);
  }

  removeExcludedCategory(categoryId: string, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorWarrantyVO.create({
      ...current,
      excludedCategories: current.excludedCategories.filter((c) => c !== categoryId),
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorWarrantyVO;
    now: string;
  }): VendorWarrantyEntity {
    return new VendorWarrantyEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorWarrantyEntityProps;
  }): VendorWarrantyEntity {
    return new VendorWarrantyEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
