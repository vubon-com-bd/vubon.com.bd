import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReturnShipmentStatusVO } from '../primitives/return-shipment-status.vo';
import { ReturnReasonVO } from '../primitives/return-reason.vo';
import { ReturnReasonTypeVO } from '../primitives/return-reason-type.vo';
import { ShipmentIdVO } from '../primitives/shipment-id.vo';

export interface ReturnShipmentProps {
  readonly shipmentId: ShipmentIdVO;
  readonly reason: ReturnReasonVO;
  readonly reasonType: ReturnReasonTypeVO;
  readonly status: ReturnShipmentStatusVO;
}

export class ReturnShipmentVO extends BaseVO<ReturnShipmentProps> {
  private constructor(props: ReturnShipmentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ReturnShipmentProps): ReturnShipmentVO {
    return new ReturnShipmentVO(props);
  }

  get shipmentId(): ShipmentIdVO { return this.value.shipmentId; }
  get reason(): ReturnReasonVO { return this.value.reason; }
  get reasonType(): ReturnReasonTypeVO { return this.value.reasonType; }
  get status(): ReturnShipmentStatusVO { return this.value.status; }
}
