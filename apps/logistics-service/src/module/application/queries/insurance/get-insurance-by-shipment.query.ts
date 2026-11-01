import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetInsuranceByShipmentQuery extends BaseQuery {
  readonly type = 'logistics.insurance.by_shipment';
  constructor(public readonly shipmentId: string) { super(); }
}
