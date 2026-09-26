import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ApprovalIdVO } from '../primitives/approval-id.vo';
import { ApprovalStatusVO } from '../primitives/approval-status.vo';
import { ApprovalReasonVO } from '../primitives/approval-reason.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface VendorApprovalProps {
  readonly id: ApprovalIdVO;
  readonly vendorId: VendorIdVO;
  readonly status: ApprovalStatusVO;
  readonly reason: ApprovalReasonVO | null;
  readonly reviewedBy: UserIdVO | null;
  readonly reviewedAt: Date | null;
}

export class VendorApprovalVO extends BaseVO<VendorApprovalProps> {
  private constructor(props: VendorApprovalProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorApprovalProps): VendorApprovalVO {
    return new VendorApprovalVO(props);
  }

  get id(): ApprovalIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get status(): ApprovalStatusVO { return this.value.status; }
  get reason(): ApprovalReasonVO | null { return this.value.reason; }
  get reviewedBy(): UserIdVO | null { return this.value.reviewedBy; }
  get reviewedAt(): Date | null { return this.value.reviewedAt; }
}
