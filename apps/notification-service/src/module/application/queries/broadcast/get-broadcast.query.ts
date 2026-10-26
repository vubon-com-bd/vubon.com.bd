import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetBroadcastQuery extends BaseQuery {
  readonly type = 'notification.broadcast.get';
  constructor(public readonly broadcastId: string) { super(); }
}
