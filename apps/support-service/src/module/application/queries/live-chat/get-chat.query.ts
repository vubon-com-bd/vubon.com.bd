/**
 * GetChatQuery
 * @module support-service/application/queries/live-chat
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetChatQuery extends BaseQuery {
  readonly type = 'support.livechat.get';

  constructor(public readonly sessionId: string) {
    super();
  }
}
