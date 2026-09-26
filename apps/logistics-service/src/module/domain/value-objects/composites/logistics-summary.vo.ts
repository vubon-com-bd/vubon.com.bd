import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ShipmentIdVO } from '../primitives/shipment-id.vo';
import { TrackingIdVO } from '../primitives/tracking-id.vo';
import { DeliveryIdVO } from '../primitives/delivery-id.vo';

export interface LogisticsSummaryProps {
  readonly shipmentId: ShipmentIdVO;
  readonly trackingId: TrackingIdVO | null;
  readonly deliveryId: DeliveryIdVO | null;
  readonly status: string;
}

export class LogisticsSummaryVO extends BaseVO<LogisticsSummaryProps> {
  private constructor(props: LogisticsSummaryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LogisticsSummaryProps): LogisticsSummaryVO {
    return new LogisticsSummaryVO(props);
  }

  get shipmentId(): ShipmentIdVO { return this.value.shipmentId; }
  get trackingId(): TrackingIdVO | null { return this.value.trackingId; }
  get deliveryId(): DeliveryIdVO | null { return this.value.deliveryId; }
  get status(): string { return this.value.status; }
}
