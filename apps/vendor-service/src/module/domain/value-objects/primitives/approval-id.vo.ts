import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidApprovalIdError } from '../../errors/approval.errors';

export class ApprovalIdVO extends BaseIdVO {
  static create(value: string): ApprovalIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidApprovalIdError(value);
    }
    return new ApprovalIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
