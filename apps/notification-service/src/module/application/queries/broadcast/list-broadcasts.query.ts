import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { BroadcastListOptionsDTO } from '@application/services/interfaces/broadcast.service.interface.js';

export class ListBroadcastsQuery extends BaseQuery {
  readonly type = 'notification.broadcast.list';
  constructor(public readonly options: BroadcastListOptionsDTO) { super(); }
}
