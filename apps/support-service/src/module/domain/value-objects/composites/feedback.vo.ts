/**
 * FeedbackVO — Feedback composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FeedbackIdVO } from '../primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../primitives/feedback-type.vo';
import { FeedbackStatusVO } from '../primitives/feedback-status.vo';
import { FeedbackContentVO } from '../primitives/feedback-content.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface FeedbackVOProps {
  readonly id: FeedbackIdVO;
  readonly type: FeedbackTypeVO;
  readonly status: FeedbackStatusVO;
  readonly content: FeedbackContentVO;
  readonly userId: UserIdVO;
  readonly rating?: number;
}

export class FeedbackVO extends BaseVO<Readonly<FeedbackVOProps>> {
  private constructor(props: FeedbackVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: FeedbackVOProps): FeedbackVO {
    if (!props.id || !props.type || !props.content || !props.userId) {
      throw new ValidationError(
        'FeedbackVO requires id, type, content, userId',
        'feedback',
      );
    }
    return new FeedbackVO(props);
  }

  get id(): FeedbackIdVO {
    return this.value.id;
  }

  get type(): FeedbackTypeVO {
    return this.value.type;
  }

  get content(): FeedbackContentVO {
    return this.value.content;
  }

  get isPositive(): boolean {
    return this.value.type.isPositive();
  }

  get needsFollowup(): boolean {
    return this.value.type.requiresFollowup() && !this.value.status.isClosed();
  }

  get hasRating(): boolean {
    return typeof this.value.rating === 'number';
  }
}
