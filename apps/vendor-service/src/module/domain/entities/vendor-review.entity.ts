import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ReviewIdVO } from '../value-objects/primitives/review-id.vo';
import { ReviewContentVO } from '../value-objects/primitives/review-content.vo';
import { ReviewStatusVO } from '../value-objects/primitives/review-status.vo';
import { RatingValueVO } from '../value-objects/primitives/rating-value.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import {
  ReviewSubmittedEvent,
  ReviewApprovedEvent,
} from '../events/vendor-review.events';

export interface VendorReviewEntityProps {
  readonly vendorId: VendorIdVO;
  readonly userId: UserIdVO;
  readonly orderId: OrderIdVO;
  readonly rating: RatingValueVO;
  readonly content: ReviewContentVO | null;
  readonly status: ReviewStatusVO;
}

export class VendorReviewEntity extends AggregateRoot<ReviewIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _userId: UserIdVO;
  private readonly _orderId: OrderIdVO;
  private readonly _rating: RatingValueVO;
  private readonly _content: ReviewContentVO | null;
  private readonly _status: ReviewStatusVO;

  private constructor(
    id: ReviewIdVO,
    props: VendorReviewEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._userId = props.userId;
    this._orderId = props.orderId;
    this._rating = props.rating;
    this._content = props.content;
    this._status = props.status;
  }

  static create(props: VendorReviewEntityProps): VendorReviewEntity {
    const now = new Date().toISOString();
    const id = ReviewIdVO.create(crypto.randomUUID());
    const entity = new VendorReviewEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new ReviewSubmittedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.userId.value,
        props.rating.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: ReviewIdVO,
    props: VendorReviewEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorReviewEntity {
    return new VendorReviewEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  approve(): VendorReviewEntity {
    const now = new Date();
    const updated = new VendorReviewEntity(
      this.id,
      { ...this._toProps(), status: ReviewStatusVO.create('approved') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ReviewApprovedEvent(this.id.value, this.id.value, this._vendorId.value, this.version + 1),
    );
    return updated;
  }

  reject(): VendorReviewEntity {
    return new VendorReviewEntity(
      this.id,
      { ...this._toProps(), status: ReviewStatusVO.create('rejected') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get userId(): UserIdVO { return this._userId; }
  get orderId(): OrderIdVO { return this._orderId; }
  get rating(): RatingValueVO { return this._rating; }
  get content(): ReviewContentVO | null { return this._content; }
  get status(): ReviewStatusVO { return this._status; }

  private _toProps(): VendorReviewEntityProps {
    return {
      vendorId: this._vendorId,
      userId: this._userId,
      orderId: this._orderId,
      rating: this._rating,
      content: this._content,
      status: this._status,
    };
  }
}
