import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ShipmentIdVO } from '../primitives/shipment-id.vo';
import { ShipmentNumberVO } from '../primitives/shipment-number.vo';
import { ShipmentStatusVO } from '../primitives/shipment-status.vo';
import { ShipmentTypeVO } from '../primitives/shipment-type.vo';
import { ShipmentPriorityVO } from '../primitives/shipment-priority.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { WeightVO } from '../primitives/weight.vo';
import { DimensionVO } from '../primitives/dimension.vo';

export interface ShipmentProps {
  readonly id: ShipmentIdVO;
  readonly number: ShipmentNumberVO;
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly vendorId: VendorIdVO | null;
  readonly status: ShipmentStatusVO;
  readonly type: ShipmentTypeVO;
  readonly priority: ShipmentPriorityVO;
  readonly weight: WeightVO | null;
  readonly dimension: DimensionVO | null;
  readonly notes: string | null;
}

export class ShipmentVO extends BaseVO<ShipmentProps> {
  private constructor(props: ShipmentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ShipmentProps): ShipmentVO {
    return new ShipmentVO(props);
  }

  get id(): ShipmentIdVO { return this.value.id; }
  get number(): ShipmentNumberVO { return this.value.number; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get userId(): UserIdVO { return this.value.userId; }
  get vendorId(): VendorIdVO | null { return this.value.vendorId; }
  get status(): ShipmentStatusVO { return this.value.status; }
  get type(): ShipmentTypeVO { return this.value.type; }
  get priority(): ShipmentPriorityVO { return this.value.priority; }
  get weight(): WeightVO | null { return this.value.weight; }
  get dimension(): DimensionVO | null { return this.value.dimension; }
  get notes(): string | null { return this.value.notes; }
}
