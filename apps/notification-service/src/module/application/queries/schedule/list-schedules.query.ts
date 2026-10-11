import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListSchedulesRequestDTO } from '../../dtos/requests/schedule/schedule.dto.js';

export class ListSchedulesQuery extends BaseQuery {
  readonly type = 'schedule.list';
  constructor(public readonly options: ListSchedulesRequestDTO) { super(); }
}
