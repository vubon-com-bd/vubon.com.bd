import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetScheduleQuery extends BaseQuery {
  readonly type = 'notification.schedule.get';
  constructor(public readonly scheduleId: string) { super(); }
}
