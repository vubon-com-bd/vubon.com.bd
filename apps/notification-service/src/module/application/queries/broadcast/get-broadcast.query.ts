import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetBroadcastQuery extends BaseQuery {
  readonly type = 'broadcast.get';
  constructor(public readonly broadcastId: string) { super(); }
}
