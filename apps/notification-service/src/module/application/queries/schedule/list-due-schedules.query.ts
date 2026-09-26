import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDueSchedulesQuery extends BaseQuery {
  readonly type = 'schedule.list-due';

  constructor(public readonly limit: number = 100) {
    super();
  }
}
