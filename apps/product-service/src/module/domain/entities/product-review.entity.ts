import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ReviewIdVO } from '../value-objects/primitives/review-id.vo';
import { ReviewRatingVO } from '../value-objects/primitives/review-rating.vo';
import { ReviewContentVO } from '../value-objects/primitives/review-content.vo';
import { ReviewStatusVO } from '../value-objects/primitives/review-status.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import {
  ReviewSubmittedEvent,
  ReviewApprovedEvent,
  ReviewRejectedEvent,
  ReviewDeletedEvent,
} from '../events/product-review.events';

export interface ProductReviewEntityProps {
  readonly productId: ProductIdVO;
  readonly userId: string;
  readonly rating: ReviewRatingVO;
  readonly content: ReviewContentVO;
  readonly status: ReviewStatusVO;
}

export class ProductReviewEntity extends AggregateRoot<ReviewIdVO> {
  private readonly _productId: ProductIdVO;
  private readonly _userId: string;
  private readonly _rating: ReviewRatingVO;
  private readonly _content: ReviewContentVO;
  private readonly _status: ReviewStatusVO;

  private constructor(
    id: ReviewIdVO,
    props: ProductReviewEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._userId = props.userId;
    this._rating = props.rating;
    this._content = props.content;
    this._status = props.status;
  }

  static create(props: ProductReviewEntityProps): ProductReviewEntity {
    const now = new Date().toISOString();
    const id = ReviewIdVO.create(crypto.randomUUID());
    const entity = new ProductReviewEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new ReviewSubmittedEvent(
        props.productId.value,
        props.productId.value,
        id.value,
        props.rating.value,
        props.userId,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: ReviewIdVO,
    props: ProductReviewEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductReviewEntity {
    return new ProductReviewEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  approve(): ProductReviewEntity {
    const updated = new ProductReviewEntity(
      this.id,
      { ...this._toProps(), status: ReviewStatusVO.create('approved') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ReviewApprovedEvent(this._productId.value, this._productId.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  reject(reason: string): ProductReviewEntity {
    const updated = new ProductReviewEntity(
      this.id,
      { ...this._toProps(), status: ReviewStatusVO.create('rejected') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ReviewRejectedEvent(
        this._productId.value,
        this._productId.value,
        this.id.value,
        reason,
        this.version + 1,
      ),
    );
    return updated;
  }

  softDelete(): ProductReviewEntity {
    const now = new Date().toISOString();
    const updated = new ProductReviewEntity(this.id, this._toProps(), this.createdAt, now, now);
    updated.addDomainEvent(
      new ReviewDeletedEvent(this._productId.value, this._productId.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  get productId(): ProductIdVO { return this._productId; }
  get userId(): string { return this._userId; }
  get rating(): ReviewRatingVO { return this._rating; }
  get content(): ReviewContentVO { return this._content; }
  get status(): ReviewStatusVO { return this._status; }

  private _toProps(): ProductReviewEntityProps {
    return {
      productId: this._productId,
      userId: this._userId,
      rating: this._rating,
      content: this._content,
      status: this._status,
    };
  }
}
