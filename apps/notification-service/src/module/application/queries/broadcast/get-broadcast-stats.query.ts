import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetBroadcastStatsQuery extends BaseQuery {
  readonly type = 'broadcast.get_stats';
  constructor(public readonly broadcastId: string) { super(); }
}
