import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSubscriptionsQuery extends BaseQuery {
  readonly type = 'subscription.list';

  constructor(public readonly userId: string) {
    super();
  }
}
