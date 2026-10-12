/**
 * DocumentStatus Value Object — includes transition state machine
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_DOCUMENT_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_DOCUMENT_STATUS) as readonly string[];

export class DocumentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DocumentStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid document status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new DocumentStatusVO(raw);
  }

  static pending(): DocumentStatusVO { return new DocumentStatusVO(VENDOR_DOCUMENT_STATUS.PENDING); }
  static verified(): DocumentStatusVO { return new DocumentStatusVO(VENDOR_DOCUMENT_STATUS.VERIFIED); }
  static rejected(): DocumentStatusVO { return new DocumentStatusVO(VENDOR_DOCUMENT_STATUS.REJECTED); }
  static expired(): DocumentStatusVO { return new DocumentStatusVO(VENDOR_DOCUMENT_STATUS.EXPIRED); }
  static resubmitted(): DocumentStatusVO { return new DocumentStatusVO(VENDOR_DOCUMENT_STATUS.RESUBMITTED); }

  static reconstitute(raw: string): DocumentStatusVO {
    return new DocumentStatusVO(raw);
  }

  isPending(): boolean { return this.value === VENDOR_DOCUMENT_STATUS.PENDING; }
  isVerified(): boolean { return this.value === VENDOR_DOCUMENT_STATUS.VERIFIED; }
  isRejected(): boolean { return this.value === VENDOR_DOCUMENT_STATUS.REJECTED; }
  isExpired(): boolean { return this.value === VENDOR_DOCUMENT_STATUS.EXPIRED; }
  isResubmitted(): boolean { return this.value === VENDOR_DOCUMENT_STATUS.RESUBMITTED; }

  /** Can this document be used for verification? */
  isValid(): boolean {
    return this.value === VENDOR_DOCUMENT_STATUS.VERIFIED;
  }

  isTerminal(): boolean {
    return this.value === VENDOR_DOCUMENT_STATUS.EXPIRED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VENDOR_DOCUMENT_STATUS.PENDING]: [
        VENDOR_DOCUMENT_STATUS.VERIFIED,
        VENDOR_DOCUMENT_STATUS.REJECTED,
        VENDOR_DOCUMENT_STATUS.EXPIRED,
      ],
      [VENDOR_DOCUMENT_STATUS.RESUBMITTED]: [
        VENDOR_DOCUMENT_STATUS.VERIFIED,
        VENDOR_DOCUMENT_STATUS.REJECTED,
        VENDOR_DOCUMENT_STATUS.EXPIRED,
      ],
      [VENDOR_DOCUMENT_STATUS.VERIFIED]: [
        VENDOR_DOCUMENT_STATUS.EXPIRED,
      ],
      [VENDOR_DOCUMENT_STATUS.REJECTED]: [
        VENDOR_DOCUMENT_STATUS.RESUBMITTED,
        VENDOR_DOCUMENT_STATUS.EXPIRED,
      ],
      [VENDOR_DOCUMENT_STATUS.EXPIRED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
