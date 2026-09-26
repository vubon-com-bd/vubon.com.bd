import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DispatchIdVO } from '../primitives/dispatch-id.vo';
import { DispatchStatusVO } from '../primitives/dispatch-status.vo';
import { DispatchTypeVO } from '../primitives/dispatch-type.vo';
import { VehicleIdVO } from '../primitives/vehicle-id.vo';
import { DriverIdVO } from '../primitives/driver-id.vo';
import { RouteIdVO } from '../primitives/route-id.vo';

export interface DispatchProps {
  readonly id: DispatchIdVO;
  readonly status: DispatchStatusVO;
  readonly type: DispatchTypeVO;
  readonly vehicleId: VehicleIdVO | null;
  readonly driverId: DriverIdVO | null;
  readonly routeId: RouteIdVO | null;
}

export class DispatchVO extends BaseVO<DispatchProps> {
  private constructor(props: DispatchProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DispatchProps): DispatchVO {
    return new DispatchVO(props);
  }

  get id(): DispatchIdVO { return this.value.id; }
  get status(): DispatchStatusVO { return this.value.status; }
  get type(): DispatchTypeVO { return this.value.type; }
  get vehicleId(): VehicleIdVO | null { return this.value.vehicleId; }
  get driverId(): DriverIdVO | null { return this.value.driverId; }
  get routeId(): RouteIdVO | null { return this.value.routeId; }
}
