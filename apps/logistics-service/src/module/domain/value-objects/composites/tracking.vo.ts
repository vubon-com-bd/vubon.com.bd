import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TrackingIdVO } from '../primitives/tracking-id.vo';
import { TrackingNumberVO } from '../primitives/tracking-number.vo';
import { TrackingStatusVO } from '../primitives/tracking-status.vo';
import { ShipmentIdVO } from '../primitives/shipment-id.vo';

export interface TrackingProps {
  readonly id: TrackingIdVO;
  readonly number: TrackingNumberVO;
  readonly shipmentId: ShipmentIdVO;
  readonly status: TrackingStatusVO;
}

export class TrackingVO extends BaseVO<TrackingProps> {
  private constructor(props: TrackingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TrackingProps): TrackingVO {
    return new TrackingVO(props);
  }

  get id(): TrackingIdVO { return this.value.id; }
  get number(): TrackingNumberVO { return this.value.number; }
  get shipmentId(): ShipmentIdVO { return this.value.shipmentId; }
  get status(): TrackingStatusVO { return this.value.status; }
}
