import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDeliveryQuery extends BaseQuery {
  readonly type = 'logistics.delivery.get';
  constructor(public readonly deliveryId: string) { super(); }
}
