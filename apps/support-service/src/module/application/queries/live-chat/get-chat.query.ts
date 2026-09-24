import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetChatQuery extends BaseQuery {
  readonly type = 'support.chat.get';

  constructor(public readonly chatId: string) {
    super();
  }
}
