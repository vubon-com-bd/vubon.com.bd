import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetBroadcastProgressQuery extends BaseQuery {
  readonly type = 'broadcast.get_progress';
  constructor(public readonly broadcastId: string) { super(); }
}
