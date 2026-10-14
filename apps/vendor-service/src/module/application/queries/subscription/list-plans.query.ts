import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListPlansQuery extends BaseQuery {
  readonly type = 'vendor.subscription.list_plans';
  constructor() {
    super();
  }
}
