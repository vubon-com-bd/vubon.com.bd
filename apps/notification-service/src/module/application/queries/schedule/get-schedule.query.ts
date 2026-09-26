import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetScheduleQuery extends BaseQuery {
  readonly type = 'schedule.get';

  constructor(public readonly scheduleId: string) {
    super();
  }
}
