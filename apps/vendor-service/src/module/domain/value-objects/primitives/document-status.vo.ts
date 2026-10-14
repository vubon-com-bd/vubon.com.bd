/**
 * DocumentStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → verified | rejected
 *   rejected → resubmitted
 *   resubmitted → verified | rejected
 *   verified → expired
 *   expired → resubmitted
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_DOCUMENT_STATUS } from '@vubon/shared-constants/business';

export type DocumentStatusValue =
  (typeof VENDOR_DOCUMENT_STATUS)[keyof typeof VENDOR_DOCUMENT_STATUS];

const VALID_STATUSES = new Set<string>(Object.values(VENDOR_DOCUMENT_STATUS));

const VALID_TRANSITIONS: Readonly<
  Record<DocumentStatusValue, readonly DocumentStatusValue[]>
> = {
  pending: ['verified', 'rejected'],
  verified: ['expired'],
  rejected: ['resubmitted'],
  resubmitted: ['verified', 'rejected'],
  expired: ['resubmitted'],
};

export class DocumentStatusVO extends BaseStatusVO<DocumentStatusValue> {
  private constructor(value: DocumentStatusValue) {
    super(value);
  }

  static create(raw: string): DocumentStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DocumentStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new ValidationError(
        `Invalid DocumentStatus: "${normalized}". Allowed: ${[...VALID_STATUSES].join(', ')}`,
        'status',
      );
    }
    return new DocumentStatusVO(normalized as DocumentStatusValue);
  }

  static reconstitute(raw: string): DocumentStatusVO {
    return new DocumentStatusVO(raw as DocumentStatusValue);
  }

  static pending(): DocumentStatusVO { return new DocumentStatusVO('pending'); }
  static verified(): DocumentStatusVO { return new DocumentStatusVO('verified'); }
  static rejected(): DocumentStatusVO { return new DocumentStatusVO('rejected'); }
  static expired(): DocumentStatusVO { return new DocumentStatusVO('expired'); }
  static resubmitted(): DocumentStatusVO { return new DocumentStatusVO('resubmitted'); }

  // ─── Predicates ───
  isPending(): boolean { return this.value === 'pending'; }
  isVerified(): boolean { return this.value === 'verified'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isExpired(): boolean { return this.value === 'expired'; }
  isResubmitted(): boolean { return this.value === 'resubmitted'; }

  isFinal(): boolean { return this.isVerified(); }
  isActionable(): boolean {
    return this.isPending() || this.isResubmitted();
  }
  isRejectedOrExpired(): boolean {
    return this.isRejected() || this.isExpired();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as DocumentStatusValue);
  }
}
