import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SuspensionIdVO } from '../primitives/suspension-id.vo';
import { SuspensionReasonVO } from '../primitives/suspension-reason.vo';
import { SuspensionStatusVO } from '../primitives/suspension-status.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface VendorSuspensionProps {
  readonly id: SuspensionIdVO;
  readonly vendorId: VendorIdVO;
  readonly reason: SuspensionReasonVO;
  readonly status: SuspensionStatusVO;
  readonly suspendedBy: UserIdVO;
  readonly suspendedAt: Date;
  readonly reinstatedAt: Date | null;
}

export class VendorSuspensionVO extends BaseVO<VendorSuspensionProps> {
  private constructor(props: VendorSuspensionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorSuspensionProps): VendorSuspensionVO {
    return new VendorSuspensionVO(props);
  }

  get id(): SuspensionIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get reason(): SuspensionReasonVO { return this.value.reason; }
  get status(): SuspensionStatusVO { return this.value.status; }
  get suspendedBy(): UserIdVO { return this.value.suspendedBy; }
  get suspendedAt(): Date { return this.value.suspendedAt; }
  get reinstatedAt(): Date | null { return this.value.reinstatedAt; }
}
