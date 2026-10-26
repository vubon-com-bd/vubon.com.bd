import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ScheduleListOptionsDTO } from '@application/services/interfaces/schedule.service.interface.js';

export class ListSchedulesQuery extends BaseQuery {
  readonly type = 'notification.schedule.list';
  constructor(public readonly options: ScheduleListOptionsDTO) { super(); }
}
