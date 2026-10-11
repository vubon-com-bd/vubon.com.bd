import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDueSchedulesQuery extends BaseQuery {
  readonly type = 'schedule.get_due';
  constructor(public readonly at?: string) { super(); }
}
