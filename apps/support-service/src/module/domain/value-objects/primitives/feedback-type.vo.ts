/**
 * FeedbackTypeVO — Feedback category
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FEEDBACK_TYPE } from '@vubon/shared-constants/support';

export type FeedbackTypeValue =
  (typeof FEEDBACK_TYPE)[keyof typeof FEEDBACK_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(FEEDBACK_TYPE),
);

const POSITIVE_TYPES: ReadonlySet<string> = new Set<string>(['praise', 'suggestion']);

export class FeedbackTypeVO extends BaseTypeVO<FeedbackTypeValue> {
  private constructor(value: FeedbackTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): FeedbackTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid feedback type: ${raw}`,
        'feedbackType',
      );
    }
    return new FeedbackTypeVO(normalized as FeedbackTypeValue);
  }

  isPositive(): boolean {
    return POSITIVE_TYPES.has(this.value);
  }

  requiresFollowup(): boolean {
    return this.value === ('complaint' as FeedbackTypeValue);
  }
}
