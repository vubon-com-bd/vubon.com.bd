import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByScheduledDateRouteQuery extends BaseQuery {
  readonly type = 'logistics.route.list_by_scheduled_date';
  constructor(public readonly scheduledDate: string) { super(); }
}
