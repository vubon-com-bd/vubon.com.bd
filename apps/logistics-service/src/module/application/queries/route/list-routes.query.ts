import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListRoutesQuery extends BaseQuery {
  readonly type = 'logistics.route.list';

  constructor(public readonly optimizedOnly: boolean = false) {
    super();
  }
}
