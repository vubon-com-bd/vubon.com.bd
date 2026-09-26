import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { RatingValueVO } from '../primitives/rating-value.vo';

export interface VendorRatingProps {
  readonly vendorId: VendorIdVO;
  readonly averageRating: RatingValueVO;
  readonly totalRatings: number;
  readonly fiveStarCount: number;
  readonly fourStarCount: number;
  readonly threeStarCount: number;
  readonly twoStarCount: number;
  readonly oneStarCount: number;
}

export class VendorRatingVO extends BaseVO<VendorRatingProps> {
  private constructor(props: VendorRatingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorRatingProps): VendorRatingVO {
    return new VendorRatingVO(props);
  }

  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get averageRating(): RatingValueVO { return this.value.averageRating; }
  get totalRatings(): number { return this.value.totalRatings; }
  get fiveStarCount(): number { return this.value.fiveStarCount; }
  get fourStarCount(): number { return this.value.fourStarCount; }
  get threeStarCount(): number { return this.value.threeStarCount; }
  get twoStarCount(): number { return this.value.twoStarCount; }
  get oneStarCount(): number { return this.value.oneStarCount; }
}
