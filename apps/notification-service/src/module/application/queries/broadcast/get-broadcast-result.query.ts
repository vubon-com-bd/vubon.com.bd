import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetBroadcastResultQuery extends BaseQuery {
  readonly type = 'notification.broadcast.get_result';
  constructor(public readonly broadcastId: string) { super(); }
}
