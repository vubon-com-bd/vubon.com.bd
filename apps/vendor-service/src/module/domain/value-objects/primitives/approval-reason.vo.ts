import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidApprovalReasonError } from '../../errors/approval.errors';

export class ApprovalReasonVO extends BaseCodeVO {
  static create(value: string): ApprovalReasonVO {
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > 1000) {
      throw new InvalidApprovalReasonError(value);
    }
    return new ApprovalReasonVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
