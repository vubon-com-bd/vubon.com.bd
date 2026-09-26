import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReviewIdVO } from '../primitives/review-id.vo';
import { ReviewRatingVO } from '../primitives/review-rating.vo';
import { ReviewContentVO } from '../primitives/review-content.vo';
import { ReviewStatusVO } from '../primitives/review-status.vo';

export interface ProductReviewProps {
  readonly id: ReviewIdVO;
  readonly rating: ReviewRatingVO;
  readonly content: ReviewContentVO;
  readonly status: ReviewStatusVO;
}

export class ProductReviewVO extends BaseVO<ProductReviewProps> {
  private constructor(props: ProductReviewProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductReviewProps): ProductReviewVO {
    return new ProductReviewVO(props);
  }

  get id(): ReviewIdVO { return this.value.id; }
  get rating(): ReviewRatingVO { return this.value.rating; }
  get content(): ReviewContentVO { return this.value.content; }
  get status(): ReviewStatusVO { return this.value.status; }
}
