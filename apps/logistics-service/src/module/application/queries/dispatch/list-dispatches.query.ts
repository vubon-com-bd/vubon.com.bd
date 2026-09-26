import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDispatchesQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list';

  constructor(public readonly status?: string) {
    super();
  }
}
