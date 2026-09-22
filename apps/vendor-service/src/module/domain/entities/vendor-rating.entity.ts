import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { RatingValueVO } from '../value-objects/primitives/rating-value.vo';

export interface VendorRatingEntityProps {
  readonly vendorId: VendorIdVO;
  readonly averageRating: RatingValueVO;
  readonly totalRatings: number;
  readonly fiveStarCount: number;
  readonly fourStarCount: number;
  readonly threeStarCount: number;
  readonly twoStarCount: number;
  readonly oneStarCount: number;
}

export class VendorRatingEntity extends BaseEntity<VendorIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _averageRating: RatingValueVO;
  private readonly _totalRatings: number;
  private readonly _fiveStarCount: number;
  private readonly _fourStarCount: number;
  private readonly _threeStarCount: number;
  private readonly _twoStarCount: number;
  private readonly _oneStarCount: number;

  private constructor(
    id: VendorIdVO,
    props: VendorRatingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._averageRating = props.averageRating;
    this._totalRatings = props.totalRatings;
    this._fiveStarCount = props.fiveStarCount;
    this._fourStarCount = props.fourStarCount;
    this._threeStarCount = props.threeStarCount;
    this._twoStarCount = props.twoStarCount;
    this._oneStarCount = props.oneStarCount;
  }

  static create(props: VendorRatingEntityProps): VendorRatingEntity {
    const now = new Date().toISOString();
    return new VendorRatingEntity(props.vendorId, props, now, now, null);
  }

  static reconstitute(
    id: VendorIdVO,
    props: VendorRatingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorRatingEntity {
    return new VendorRatingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get averageRating(): RatingValueVO { return this._averageRating; }
  get totalRatings(): number { return this._totalRatings; }
  get fiveStarCount(): number { return this._fiveStarCount; }
  get fourStarCount(): number { return this._fourStarCount; }
  get threeStarCount(): number { return this._threeStarCount; }
  get twoStarCount(): number { return this._twoStarCount; }
  get oneStarCount(): number { return this._oneStarCount; }
}
