import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSchedulesQuery extends BaseQuery {
  readonly type = 'schedule.list';

  constructor(public readonly userId: string) {
    super();
  }
}
