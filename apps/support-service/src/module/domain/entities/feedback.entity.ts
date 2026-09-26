/**
 * FeedbackEntity — Feedback aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<FeedbackIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { FeedbackIdVO } from '../value-objects/primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../value-objects/primitives/feedback-type.vo';
import { FeedbackStatusVO } from '../value-objects/primitives/feedback-status.vo';
import { FeedbackContentVO } from '../value-objects/primitives/feedback-content.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import {
  FeedbackSubmittedEvent,
  FeedbackReviewedEvent,
} from '../events/feedback.events';

export interface CreateFeedbackInput {
  readonly id: FeedbackIdVO;
  readonly type: FeedbackTypeVO;
  readonly content: FeedbackContentVO;
  readonly userId: UserIdVO;
  readonly rating?: number;
  readonly ticketId?: TicketIdVO;
  readonly orderId?: OrderIdVO;
  readonly now: string;
}

export interface FeedbackSnapshot {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly content: string;
  readonly userId: string;
  readonly rating?: number;
  readonly ticketId?: string;
  readonly orderId?: string;
  readonly reviewerId?: string;
  readonly reviewedAt?: string;
  readonly reviewOutcome?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class FeedbackEntity extends AggregateRoot<FeedbackIdVO> {
  private readonly _type: FeedbackTypeVO;
  private _status: FeedbackStatusVO;
  private readonly _content: FeedbackContentVO;
  private readonly _userId: UserIdVO;
  private readonly _rating?: number;
  private readonly _ticketId?: TicketIdVO;
  private readonly _orderId?: OrderIdVO;
  private _reviewerId?: UserIdVO;
  private _reviewedAt?: string;
  private _reviewOutcome?: string;

  private constructor(
    id: FeedbackIdVO,
    type: FeedbackTypeVO,
    status: FeedbackStatusVO,
    content: FeedbackContentVO,
    userId: UserIdVO,
    createdAt: string,
    updatedAt: string,
    rating?: number,
    ticketId?: TicketIdVO,
    orderId?: OrderIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._status = status;
    this._content = content;
    this._userId = userId;
    this._rating = rating;
    this._ticketId = ticketId;
    this._orderId = orderId;
  }

  static create(input: CreateFeedbackInput): FeedbackEntity {
    if (!input.id || !input.userId || !input.content) {
      throw new ValidationError(
        'Feedback requires id, userId, content',
        'feedback',
      );
    }
    if (input.rating !== undefined) {
      if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
        throw new ValidationError(
          'Feedback rating must be integer 1-5',
          'feedback',
        );
      }
    }
    if (input.type.isPositive() && input.rating !== undefined && input.rating < 4) {
      throw new BusinessRuleError(
        'Positive feedback must have rating >= 4',
        'feedback.positive.rating',
      );
    }
    const now = input.now;
    const feedback = new FeedbackEntity(
      input.id,
      input.type,
      FeedbackStatusVO.create('pending'),
      input.content,
      input.userId,
      now,
      now,
      input.rating,
      input.ticketId,
      input.orderId,
    );
    feedback.addDomainEvent(
      new FeedbackSubmittedEvent(
        input.id,
        input.userId,
        input.type,
        Date.parse(now),
        input.rating,
      ),
    );
    return feedback;
  }

  static rehydrate(snapshot: FeedbackSnapshot): FeedbackEntity {
    const feedback = new FeedbackEntity(
      FeedbackIdVO.create(snapshot.id),
      FeedbackTypeVO.create(snapshot.type),
      FeedbackStatusVO.create(snapshot.status),
      FeedbackContentVO.create(snapshot.content),
      UserIdVO.create(snapshot.userId),
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.rating,
      snapshot.ticketId ? TicketIdVO.create(snapshot.ticketId) : undefined,
      snapshot.orderId ? OrderIdVO.create(snapshot.orderId) : undefined,
    );
    feedback._reviewerId = snapshot.reviewerId ? UserIdVO.create(snapshot.reviewerId) : undefined;
    feedback._reviewedAt = snapshot.reviewedAt;
    feedback._reviewOutcome = snapshot.reviewOutcome;
    return feedback;
  }

  get type(): FeedbackTypeVO {
    return this._type;
  }

  get status(): FeedbackStatusVO {
    return this._status;
  }

  get content(): FeedbackContentVO {
    return this._content;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get rating(): number | undefined {
    return this._rating;
  }

  get isPositive(): boolean {
    return this._type.isPositive();
  }

  get isReviewed(): boolean {
    return this._reviewedAt !== undefined;
  }

  get needsFollowup(): boolean {
    return this._type.requiresFollowup() && !this._status.isClosed();
  }

  review(reviewerId: UserIdVO, outcome: string, now: string): void {
    if (this.isReviewed) {
      throw new BusinessRuleError(
        'Feedback already reviewed',
        'feedback.already.reviewed',
      );
    }
    if (typeof outcome !== 'string' || outcome.trim().length === 0) {
      throw new ValidationError('Review outcome required', 'feedback');
    }
    this._reviewerId = reviewerId;
    this._reviewedAt = now;
    this._reviewOutcome = outcome.trim();
    this._status = FeedbackStatusVO.create('closed');
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new FeedbackReviewedEvent(
        this.id,
        reviewerId,
        this._reviewOutcome,
        Date.parse(now),
        this.version + 1,
      ),
    );
  }

  toSnapshot(): FeedbackSnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      status: this._status.value,
      content: this._content.value,
      userId: this._userId.value,
      rating: this._rating,
      ticketId: this._ticketId?.value,
      orderId: this._orderId?.value,
      reviewerId: this._reviewerId?.value,
      reviewedAt: this._reviewedAt,
      reviewOutcome: this._reviewOutcome,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
