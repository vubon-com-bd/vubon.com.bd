import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPlansQuery extends BaseQuery {
  readonly type = 'vendor.subscription.list-plans';

  constructor() {
    super();
  }
}
