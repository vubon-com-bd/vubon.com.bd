/**
 * ReviewComment Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { REVIEW } from '@vubon/shared-constants/business/product';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReviewCommentVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReviewCommentVO {
    if (typeof raw !== 'string') {
      throw new Error('ReviewComment must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length > 0 && trimmed.length < REVIEW.COMMENT_MIN_LENGTH) {
      throw new ValidationError(
        `ReviewComment must be at least ${REVIEW.COMMENT_MIN_LENGTH} chars`,
        'comment'
      );
    }
    if (trimmed.length > REVIEW.COMMENT_MAX_LENGTH) {
      throw new ValidationError(
        `ReviewComment cannot exceed ${REVIEW.COMMENT_MAX_LENGTH} chars`,
        'comment'
      );
    }
    return new ReviewCommentVO(trimmed);
  }

  static empty(): ReviewCommentVO {
    return new ReviewCommentVO('');
  }

  static reconstitute(raw: string): ReviewCommentVO {
    return new ReviewCommentVO(raw);
  }
}
