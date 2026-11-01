/**
 * ReviewContent Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REVIEW } from '@vubon/shared-constants/business';

export class ReviewContentVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReviewContentVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReviewContent must be a string', 'comment');
    }
    const trimmed = raw.trim();
    if (trimmed.length < REVIEW.COMMENT_MIN_LENGTH) {
      throw new ValidationError(
        `ReviewContent must be at least ${REVIEW.COMMENT_MIN_LENGTH} chars`,
        'comment',
      );
    }
    if (trimmed.length > REVIEW.COMMENT_MAX_LENGTH) {
      throw new ValidationError(
        `ReviewContent exceeds max ${REVIEW.COMMENT_MAX_LENGTH} chars`,
        'comment',
      );
    }
    return new ReviewContentVO(trimmed);
  }

  static reconstitute(raw: string): ReviewContentVO { return new ReviewContentVO(raw); }

  get length(): number { return this.value.length; }
  get wordCount(): number { return this.value.split(/\s+/).filter(Boolean).length; }
  containsProfanity(patterns: readonly string[]): boolean {
    const lower = this.value.toLowerCase();
    return patterns.some((p) => lower.includes(p.toLowerCase()));
  }
}
