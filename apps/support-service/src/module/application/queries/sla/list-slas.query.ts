import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSlasQuery extends BaseQuery {
  readonly type = 'support.sla.list';

  constructor() {
    super();
  }
}
