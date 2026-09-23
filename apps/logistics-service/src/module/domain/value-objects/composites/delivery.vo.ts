import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeliveryIdVO } from '../primitives/delivery-id.vo';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo';
import { DeliveryTypeVO } from '../primitives/delivery-type.vo';
import { ShipmentIdVO } from '../primitives/shipment-id.vo';

export interface DeliveryProps {
  readonly id: DeliveryIdVO;
  readonly shipmentId: ShipmentIdVO;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly scheduledAt: Date | null;
  readonly deliveredAt: Date | null;
  readonly attempts: number;
}

export class DeliveryVO extends BaseVO<DeliveryProps> {
  private constructor(props: DeliveryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DeliveryProps): DeliveryVO {
    return new DeliveryVO(props);
  }

  get id(): DeliveryIdVO { return this.value.id; }
  get shipmentId(): ShipmentIdVO { return this.value.shipmentId; }
  get status(): DeliveryStatusVO { return this.value.status; }
  get type(): DeliveryTypeVO { return this.value.type; }
  get scheduledAt(): Date | null { return this.value.scheduledAt; }
  get deliveredAt(): Date | null { return this.value.deliveredAt; }
  get attempts(): number { return this.value.attempts; }
}
