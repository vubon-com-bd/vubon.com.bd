import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDeliveryPublicQuery extends BaseQuery {
  readonly type = 'logistics.delivery.get_public';
  constructor(public readonly deliveryId: string) { super(); }
}
