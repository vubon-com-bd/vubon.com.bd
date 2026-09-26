/**
 * FeedbackContentVO — Feedback message body
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION } from '@vubon/shared-constants/common';

const MIN_LENGTH = 5;
const MAX_LENGTH = VALIDATION.COMMENT_MAX_LENGTH;

export class FeedbackContentVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FeedbackContentVO {
    BaseCodeVO.validateNonEmpty(raw, 'FeedbackContent');
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `FeedbackContent too short (min ${MIN_LENGTH})`,
        'feedbackContent',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `FeedbackContent too long (max ${MAX_LENGTH})`,
        'feedbackContent',
      );
    }
    return new FeedbackContentVO(trimmed);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  get isDetailed(): boolean {
    return this.wordCount > 50;
  }
}
