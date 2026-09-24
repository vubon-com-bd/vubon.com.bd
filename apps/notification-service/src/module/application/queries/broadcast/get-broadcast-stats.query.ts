import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetBroadcastStatsQuery extends BaseQuery {
  readonly type = 'broadcast.stats';

  constructor(public readonly broadcastId: string) {
    super();
  }
}
