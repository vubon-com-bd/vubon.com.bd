/**
 * ReviewStatus Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REVIEW_STATUS } from '@vubon/shared-constants/business';

export type ReviewStatusValue = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

const VALID: readonly string[] = Object.values(REVIEW_STATUS);

export class ReviewStatusVO extends BaseStatusVO<ReviewStatusValue> {
  private constructor(value: ReviewStatusValue) { super(value); }

  static create(raw: string): ReviewStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReviewStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid ReviewStatus: "${normalized}". Allowed: ${VALID.join(', ')}`,
        'status',
      );
    }
    return new ReviewStatusVO(normalized as ReviewStatusValue);
  }

  static reconstitute(raw: string): ReviewStatusVO {
    return new ReviewStatusVO(raw as ReviewStatusValue);
  }

  static pending(): ReviewStatusVO { return new ReviewStatusVO('pending'); }
  static approved(): ReviewStatusVO { return new ReviewStatusVO('approved'); }
  static rejected(): ReviewStatusVO { return new ReviewStatusVO('rejected'); }
  static spam(): ReviewStatusVO { return new ReviewStatusVO('spam'); }
  static deleted(): ReviewStatusVO { return new ReviewStatusVO('deleted'); }

  isPending(): boolean { return this.value === 'pending'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isSpam(): boolean { return this.value === 'spam'; }
  isDeleted(): boolean { return this.value === 'deleted'; }

  isVisible(): boolean { return this.isApproved(); }
  isFinal(): boolean { return this.isRejected() || this.isSpam() || this.isDeleted(); }
}
