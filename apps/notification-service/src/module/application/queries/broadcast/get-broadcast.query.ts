import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetBroadcastQuery extends BaseQuery {
  readonly type = 'broadcast.get';

  constructor(public readonly broadcastId: string) {
    super();
  }
}
