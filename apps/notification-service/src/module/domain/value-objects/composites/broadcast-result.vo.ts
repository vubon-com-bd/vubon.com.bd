import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo';
import { DeliveryErrorVO } from '../primitives/delivery-error.vo';

export interface BroadcastResultProps {
  readonly userId: UserIdVO;
  readonly status: DeliveryStatusVO;
  readonly deliveredAt: Date | null;
  readonly error: DeliveryErrorVO | null;
}

export class BroadcastResultVO extends BaseVO<BroadcastResultProps> {
  private constructor(props: BroadcastResultProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: BroadcastResultProps): BroadcastResultVO {
    return new BroadcastResultVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get status(): DeliveryStatusVO { return this.value.status; }
  get deliveredAt(): Date | null { return this.value.deliveredAt; }
  get error(): DeliveryErrorVO | null { return this.value.error; }
}
