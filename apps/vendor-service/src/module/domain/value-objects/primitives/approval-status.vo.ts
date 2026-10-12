/**
 * ApprovalStatus Value Object — vendor onboarding approval state
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_APPROVAL_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_APPROVAL_STATUS) as readonly string[];

export class ApprovalStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ApprovalStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid approval status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new ApprovalStatusVO(raw);
  }

  static pending(): ApprovalStatusVO { return new ApprovalStatusVO(VENDOR_APPROVAL_STATUS.PENDING); }
  static approved(): ApprovalStatusVO { return new ApprovalStatusVO(VENDOR_APPROVAL_STATUS.APPROVED); }
  static rejected(): ApprovalStatusVO { return new ApprovalStatusVO(VENDOR_APPROVAL_STATUS.REJECTED); }
  static infoRequested(): ApprovalStatusVO { return new ApprovalStatusVO(VENDOR_APPROVAL_STATUS.INFO_REQUESTED); }
  static underAppeal(): ApprovalStatusVO { return new ApprovalStatusVO(VENDOR_APPROVAL_STATUS.UNDER_APPEAL); }

  static reconstitute(raw: string): ApprovalStatusVO {
    return new ApprovalStatusVO(raw);
  }

  isPending(): boolean { return this.value === VENDOR_APPROVAL_STATUS.PENDING; }
  isApproved(): boolean { return this.value === VENDOR_APPROVAL_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === VENDOR_APPROVAL_STATUS.REJECTED; }
  isInfoRequested(): boolean { return this.value === VENDOR_APPROVAL_STATUS.INFO_REQUESTED; }
  isUnderAppeal(): boolean { return this.value === VENDOR_APPROVAL_STATUS.UNDER_APPEAL; }

  isFinal(): boolean {
    return this.value === VENDOR_APPROVAL_STATUS.APPROVED || this.value === VENDOR_APPROVAL_STATUS.REJECTED;
  }

  isActionableByVendor(): boolean {
    return this.value === VENDOR_APPROVAL_STATUS.INFO_REQUESTED || this.value === VENDOR_APPROVAL_STATUS.REJECTED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VENDOR_APPROVAL_STATUS.PENDING]: [
        VENDOR_APPROVAL_STATUS.APPROVED,
        VENDOR_APPROVAL_STATUS.REJECTED,
        VENDOR_APPROVAL_STATUS.INFO_REQUESTED,
      ],
      [VENDOR_APPROVAL_STATUS.INFO_REQUESTED]: [
        VENDOR_APPROVAL_STATUS.PENDING,
        VENDOR_APPROVAL_STATUS.APPROVED,
        VENDOR_APPROVAL_STATUS.REJECTED,
      ],
      [VENDOR_APPROVAL_STATUS.REJECTED]: [
        VENDOR_APPROVAL_STATUS.UNDER_APPEAL,
      ],
      [VENDOR_APPROVAL_STATUS.UNDER_APPEAL]: [
        VENDOR_APPROVAL_STATUS.APPROVED,
        VENDOR_APPROVAL_STATUS.REJECTED,
        VENDOR_APPROVAL_STATUS.PENDING,
      ],
      [VENDOR_APPROVAL_STATUS.APPROVED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
