import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCancelQuery extends BaseQuery {
  readonly type = 'order.cancel.get';

  constructor(public readonly cancelId: string) {
    super();
  }
}
