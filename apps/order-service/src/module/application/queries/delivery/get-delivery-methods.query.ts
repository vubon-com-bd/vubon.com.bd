import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDeliveryMethodsQuery extends BaseQuery {
  readonly type = 'delivery.methods.list';
  constructor(public readonly onlyActive = true) { super(); }
}
