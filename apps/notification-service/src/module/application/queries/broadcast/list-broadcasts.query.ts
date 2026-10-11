import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListBroadcastsRequestDTO } from '../../dtos/requests/broadcast/broadcast.dto.js';

export class ListBroadcastsQuery extends BaseQuery {
  readonly type = 'broadcast.list';
  constructor(public readonly options: ListBroadcastsRequestDTO) { super(); }
}
