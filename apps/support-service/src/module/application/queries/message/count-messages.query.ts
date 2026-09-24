import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class CountMessagesQuery extends BaseQuery {
  readonly type = 'support.message.count';

  constructor(public readonly ticketId: string) {
    super();
  }
}
