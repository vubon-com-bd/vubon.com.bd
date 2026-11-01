/**
 * ReviewStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → approved | rejected | flagged
 *   approved → hidden
 *   flagged → approved | hidden | rejected
 *   hidden → approved
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_REVIEW_STATUS } from '@vubon/shared-constants/business';

export type ReviewStatusValue =
  (typeof VENDOR_REVIEW_STATUS)[keyof typeof VENDOR_REVIEW_STATUS];

const VALID_STATUSES = new Set<string>(Object.values(VENDOR_REVIEW_STATUS));

const VALID_TRANSITIONS: Readonly<
  Record<ReviewStatusValue, readonly ReviewStatusValue[]>
> = {
  pending: ['approved', 'rejected', 'flagged'],
  approved: ['hidden', 'flagged'],
  rejected: [],
  flagged: ['approved', 'hidden', 'rejected'],
  hidden: ['approved'],
};

export class ReviewStatusVO extends BaseStatusVO<ReviewStatusValue> {
  private constructor(value: ReviewStatusValue) {
    super(value);
  }

  static create(raw: string): ReviewStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReviewStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new ValidationError(
        `Invalid ReviewStatus: "${normalized}". Allowed: ${[...VALID_STATUSES].join(', ')}`,
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
  static flagged(): ReviewStatusVO { return new ReviewStatusVO('flagged'); }
  static hidden(): ReviewStatusVO { return new ReviewStatusVO('hidden'); }

  // ─── Predicates ───
  isPending(): boolean { return this.value === 'pending'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isFlagged(): boolean { return this.value === 'flagged'; }
  isHidden(): boolean { return this.value === 'hidden'; }

  isFinal(): boolean { return this.isRejected(); }

  /** Counts toward vendor rating */
  countsTowardRating(): boolean {
    return this.isApproved();
  }

  /** Publicly visible */
  isVisible(): boolean {
    return this.isApproved();
  }

  /** Needs moderation action */
  needsModeration(): boolean {
    return this.isPending() || this.isFlagged();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as ReviewStatusValue);
  }
}
