/**
 * FeedbackStatusVO — Feedback processing status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FEEDBACK_STATUS } from '@vubon/shared-constants/support';

export type FeedbackStatusValue =
  (typeof FEEDBACK_STATUS)[keyof typeof FEEDBACK_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(FEEDBACK_STATUS),
);

const CLOSED: ReadonlySet<string> = new Set<string>(['closed', 'archived']);

export class FeedbackStatusVO extends BaseStatusVO<FeedbackStatusValue> {
  private constructor(value: FeedbackStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): FeedbackStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid feedback status: ${raw}`,
        'feedbackStatus',
      );
    }
    return new FeedbackStatusVO(normalized as FeedbackStatusValue);
  }

  isClosed(): boolean {
    return CLOSED.has(this.value);
  }

  needsReview(): boolean {
    return this.value === ('pending' as FeedbackStatusValue);
  }
}
