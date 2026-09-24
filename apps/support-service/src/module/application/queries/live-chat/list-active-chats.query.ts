import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListActiveChatsQuery extends BaseQuery {
  readonly type = 'support.chat.list-active';

  constructor() {
    super();
  }
}
