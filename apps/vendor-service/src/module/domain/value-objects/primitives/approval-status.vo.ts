import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VENDOR_APPROVAL_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidApprovalStatusError } from '../../errors/approval.errors';

const VALID = new Set<string>(Object.values(VENDOR_APPROVAL_STATUS));

export class ApprovalStatusVO extends BaseVO<string> {
  static create(value: string): ApprovalStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidApprovalStatusError(value);
    }
    return new ApprovalStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }

  isApproved(): boolean {
    return this.value === VENDOR_APPROVAL_STATUS.APPROVED;
  }

  isRejected(): boolean {
    return this.value === VENDOR_APPROVAL_STATUS.REJECTED;
  }

  isPending(): boolean {
    return this.value === VENDOR_APPROVAL_STATUS.PENDING;
  }
}
