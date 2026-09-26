import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReviewIdVO } from '../primitives/review-id.vo';
import { ReviewContentVO } from '../primitives/review-content.vo';
import { ReviewStatusVO } from '../primitives/review-status.vo';
import { RatingValueVO } from '../primitives/rating-value.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { OrderIdVO } from '../primitives/order-id.vo';

export interface VendorReviewProps {
  readonly id: ReviewIdVO;
  readonly vendorId: VendorIdVO;
  readonly userId: UserIdVO;
  readonly orderId: OrderIdVO;
  readonly rating: RatingValueVO;
  readonly content: ReviewContentVO | null;
  readonly status: ReviewStatusVO;
  readonly createdAt: Date;
}

export class VendorReviewVO extends BaseVO<VendorReviewProps> {
  private constructor(props: VendorReviewProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorReviewProps): VendorReviewVO {
    return new VendorReviewVO(props);
  }

  get id(): ReviewIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get userId(): UserIdVO { return this.value.userId; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get rating(): RatingValueVO { return this.value.rating; }
  get content(): ReviewContentVO | null { return this.value.content; }
  get status(): ReviewStatusVO { return this.value.status; }
  get createdAt(): Date { return this.value.createdAt; }
}
