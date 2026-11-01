/**
 * ApprovalStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → approved | rejected | info_requested
 *   info_requested → pending | approved | rejected
 *   rejected → under_appeal
 *   under_appeal → approved | rejected
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_APPROVAL_STATUS } from '@vubon/shared-constants/business';

export type ApprovalStatusValue =
  (typeof VENDOR_APPROVAL_STATUS)[keyof typeof VENDOR_APPROVAL_STATUS];

const VALID_STATUSES = new Set<string>(Object.values(VENDOR_APPROVAL_STATUS));

const VALID_TRANSITIONS: Readonly<
  Record<ApprovalStatusValue, readonly ApprovalStatusValue[]>
> = {
  pending: ['approved', 'rejected', 'info_requested'],
  info_requested: ['pending', 'approved', 'rejected'],
  approved: [],
  rejected: ['under_appeal'],
  under_appeal: ['approved', 'rejected'],
};

export class ApprovalStatusVO extends BaseStatusVO<ApprovalStatusValue> {
  private constructor(value: ApprovalStatusValue) {
    super(value);
  }

  static create(raw: string): ApprovalStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ApprovalStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new ValidationError(
        `Invalid ApprovalStatus: "${normalized}". Allowed: ${[...VALID_STATUSES].join(', ')}`,
        'status',
      );
    }
    return new ApprovalStatusVO(normalized as ApprovalStatusValue);
  }

  static reconstitute(raw: string): ApprovalStatusVO {
    return new ApprovalStatusVO(raw as ApprovalStatusValue);
  }

  static pending(): ApprovalStatusVO { return new ApprovalStatusVO('pending'); }
  static approved(): ApprovalStatusVO { return new ApprovalStatusVO('approved'); }
  static rejected(): ApprovalStatusVO { return new ApprovalStatusVO('rejected'); }
  static infoRequested(): ApprovalStatusVO { return new ApprovalStatusVO('info_requested'); }
  static underAppeal(): ApprovalStatusVO { return new ApprovalStatusVO('under_appeal'); }

  // ─── Predicates ───
  isPending(): boolean { return this.value === 'pending'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isInfoRequested(): boolean { return this.value === 'info_requested'; }
  isUnderAppeal(): boolean { return this.value === 'under_appeal'; }

  isFinal(): boolean { return this.isApproved(); }
  isAwaitingAction(): boolean {
    return this.isPending() || this.isInfoRequested() || this.isUnderAppeal();
  }
  canBeAppealed(): boolean { return this.isRejected(); }
  canResubmit(): boolean { return this.isInfoRequested(); }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as ApprovalStatusValue);
  }
}
