import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeliveryIdVO } from '../primitives/delivery-id.vo';
import { DeliveryNoteVO } from '../primitives/delivery-note.vo';

export interface DeliveryAttemptDetailProps {
  readonly deliveryId: DeliveryIdVO;
  readonly attemptNo: number;
  readonly status: string;
  readonly note: DeliveryNoteVO | null;
  readonly attemptedAt: Date;
}

export class DeliveryAttemptDetailVO extends BaseVO<DeliveryAttemptDetailProps> {
  private constructor(props: DeliveryAttemptDetailProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DeliveryAttemptDetailProps): DeliveryAttemptDetailVO {
    return new DeliveryAttemptDetailVO(props);
  }

  get deliveryId(): DeliveryIdVO { return this.value.deliveryId; }
  get attemptNo(): number { return this.value.attemptNo; }
  get status(): string { return this.value.status; }
  get note(): DeliveryNoteVO | null { return this.value.note; }
  get attemptedAt(): Date { return this.value.attemptedAt; }
}
