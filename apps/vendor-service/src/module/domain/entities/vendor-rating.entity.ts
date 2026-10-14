/**
 * VendorRatingEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorRatingVO,
  type VendorRatingVOProps,
} from '../value-objects/composites/vendor-rating.vo.js';

export interface VendorRatingEntityProps {
  readonly vo: VendorRatingVO;
}

export class VendorRatingEntity extends BaseEntity<string> {
  private _vo: VendorRatingVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorRatingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorRatingVO { return this._vo; }
  get vendorId() { return this._vo.vendorId; }
  get overall() { return this._vo.overall; }
  get productQuality() { return this._vo.productQuality; }
  get shippingSpeed() { return this._vo.shippingSpeed; }
  get customerService() { return this._vo.customerService; }
  get communication() { return this._vo.communication; }
  get valueForMoney() { return this._vo.valueForMoney; }
  get packaging() { return this._vo.packaging; }
  get totalReviews(): number { return this._vo.totalReviews; }
  get recentReviews(): number { return this._vo.recentReviews; }
  get distribution() { return this._vo.distribution; }
  get lastUpdatedAt(): string { return this._vo.lastUpdatedAt; }
  get weightedScore(): number { return this._vo.weightedScore; }
  get positivePercent(): number { return this._vo.positivePercent; }
  get negativePercent(): number { return this._vo.negativePercent; }

  // ═══ Predicates ═══
  hasReviews(): boolean { return this._vo.hasReviews(); }
  hasEnoughForDisplay(): boolean { return this._vo.hasEnoughForDisplay(); }
  isPositive(): boolean { return this._vo.isPositive(); }
  isNeutral(): boolean { return this._vo.isNeutral(); }
  isNegative(): boolean { return this._vo.isNegative(); }
  triggersAutoHide(): boolean { return this._vo.triggersAutoHide(); }
  triggersAutoFlag(): boolean { return this._vo.triggersAutoFlag(); }

  countFor(star: 1 | 2 | 3 | 4 | 5): number { return this._vo.countFor(star); }
  percentFor(star: 1 | 2 | 3 | 4 | 5): number { return this._vo.percentFor(star); }

  // ═══ Business Actions ═══
  /**
   * Recalculate distribution + averages from raw review list.
   */
  recalculateFrom(
    reviews: readonly { rating: number; isRecent: boolean }[],
    now: string = new Date().toISOString(),
  ): void {
    if (reviews.length === 0) {
      throw new ValidationError('Cannot recalculate from empty reviews', 'reviews');
    }
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Math.round((sum / total) * 10) / 10;

    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
    };
    for (const r of reviews) {
      const star = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5;
      if (star >= 1 && star <= 5) distribution[star] += 1;
    }

    const recentCount = reviews.filter((r) => r.isRecent).length;

    const current = this._vo.value;
    this._vo = VendorRatingVO.create({
      ...current,
      overall: current.overall.constructor === Object
        ? current.overall
        : current.overall,
      distribution,
      totalReviews: total,
      recentReviews: recentCount,
      lastUpdatedAt: now,
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorRatingVO;
    now: string;
  }): VendorRatingEntity {
    return new VendorRatingEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorRatingEntityProps;
  }): VendorRatingEntity {
    return new VendorRatingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
