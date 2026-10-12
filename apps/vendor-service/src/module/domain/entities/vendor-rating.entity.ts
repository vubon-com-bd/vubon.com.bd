/**
 * VendorRatingEntity — aggregated rating rollup per vendor
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RatingScoreVO } from '../value-objects/primitives/rating-score.vo.js';
import { VendorRatingCategoryVO } from '../value-objects/primitives/vendor-rating-category.vo.js';

export interface RatingCategoryScore {
  readonly category: VendorRatingCategoryVO;
  readonly score: number;
  readonly count: number;
}

export interface VendorRatingEntityProps {
  readonly vendorId: string;
  readonly overall: RatingScoreVO;
  readonly totalReviews: number;
  readonly distribution: Readonly<Record<'1' | '2' | '3' | '4' | '5', number>>;
  readonly categories: readonly RatingCategoryScore[];
  readonly recentWeight: number;
}

export class VendorRatingEntity extends AggregateRoot<string> {
  private _overall: RatingScoreVO;
  private _totalReviews: number;
  private _distribution: Record<'1' | '2' | '3' | '4' | '5', number>;
  private _categories: RatingCategoryScore[];
  private _recentWeight: number;

  private readonly _vendorId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorRatingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._overall = props.overall;
    this._totalReviews = props.totalReviews;
    this._distribution = { ...props.distribution };
    this._categories = [...props.categories];
    this._recentWeight = props.recentWeight;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isInteger(this._totalReviews) || this._totalReviews < 0) {
      throw new ValidationError('Total reviews must be a non-negative integer', 'totalReviews');
    }
    const d = this._distribution;
    const sum = d['1'] + d['2'] + d['3'] + d['4'] + d['5'];
    if (sum !== this._totalReviews) {
      throw new ValidationError(
        `Distribution sum (${sum}) != totalReviews (${this._totalReviews})`,
        'distribution',
      );
    }
    if (this._categories.length > 20) {
      throw new ValidationError('Categories cannot exceed 20', 'categories');
    }
    if (this._recentWeight < 0) {
      throw new ValidationError('Recent weight must be non-negative', 'recentWeight');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get overall(): RatingScoreVO { return this._overall; }
  get totalReviews(): number { return this._totalReviews; }
  get distribution(): Readonly<Record<'1' | '2' | '3' | '4' | '5', number>> { return this._distribution; }
  get categories(): readonly RatingCategoryScore[] { return this._categories; }
  get recentWeight(): number { return this._recentWeight; }

  positiveRatio(): number {
    if (this._totalReviews === 0) return 0;
    const positive = this._distribution['4'] + this._distribution['5'];
    return Math.round((positive / this._totalReviews) * 100) / 100;
  }

  negativeRatio(): number {
    if (this._totalReviews === 0) return 0;
    const negative = this._distribution['1'] + this._distribution['2'];
    return Math.round((negative / this._totalReviews) * 100) / 100;
  }

  percentageFor(stars: '1' | '2' | '3' | '4' | '5'): number {
    if (this._totalReviews === 0) return 0;
    return Math.round((this._distribution[stars] / this._totalReviews) * 100);
  }

  /** Recomputed overall from distribution. */
  computeOverall(): RatingScoreVO {
    if (this._totalReviews === 0) return RatingScoreVO.zero();
    const weighted =
      (this._distribution['1'] * 1
        + this._distribution['2'] * 2
        + this._distribution['3'] * 3
        + this._distribution['4'] * 4
        + this._distribution['5'] * 5) / this._totalReviews;
    return RatingScoreVO.create(weighted);
  }

  /** Record a new review (rating 1..5). */
  recordReview(rating: number, now: string = new Date().toISOString()): void {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new ValidationError('Rating must be an integer between 1 and 5', 'rating');
    }
    const key = String(rating) as '1' | '2' | '3' | '4' | '5';
    this._distribution[key] += 1;
    this._totalReviews += 1;
    this._overall = this.computeOverall();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  /** Remove a review (e.g., deleted/hidden). */
  removeReview(rating: number, now: string = new Date().toISOString()): void {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new ValidationError('Rating must be an integer between 1 and 5', 'rating');
    }
    const key = String(rating) as '1' | '2' | '3' | '4' | '5';
    if (this._distribution[key] <= 0) return;
    this._distribution[key] -= 1;
    this._totalReviews = Math.max(0, this._totalReviews - 1);
    this._overall = this.computeOverall();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  updateCategory(category: VendorRatingCategoryVO, score: number, count: number, now: string = new Date().toISOString()): void {
    if (score < 0 || score > 5) {
      throw new ValidationError('Category score must be between 0 and 5', 'score');
    }
    if (count < 0 || !Number.isInteger(count)) {
      throw new ValidationError('Category count must be a non-negative integer', 'count');
    }
    const idx = this._categories.findIndex((c) => c.category.value === category.value);
    const next = { category, score: Math.round(score * 10) / 10, count };
    if (idx >= 0) this._categories[idx] = next;
    else this._categories.push(next);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  getCategoryScore(category: VendorRatingCategoryVO): number | undefined {
    return this._categories.find((c) => c.category.value === category.value)?.score;
  }

  static create(params: {
    id: string;
    vendorId: string;
    now: string;
  }): VendorRatingEntity {
    return new VendorRatingEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      overall: RatingScoreVO.zero(),
      totalReviews: 0,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      categories: [],
      recentWeight: 0,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorRatingEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorRatingEntity {
    const entity = new VendorRatingEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
