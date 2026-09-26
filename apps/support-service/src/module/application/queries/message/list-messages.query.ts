/**
 * ListMessagesQuery
 * @module support-service/application/queries/message
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListMessagesQuery extends BaseQuery {
  readonly type = 'support.message.list';

  constructor(
    public readonly conversationId: string,
    public readonly page = 1,
    public readonly limit = 50,
  ) {
    super();
  }
}
