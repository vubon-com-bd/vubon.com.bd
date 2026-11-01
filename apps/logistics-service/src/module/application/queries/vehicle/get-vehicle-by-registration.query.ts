import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetVehicleByRegistrationQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.by_registration';
  constructor(public readonly registrationNumber: string) { super(); }
}
