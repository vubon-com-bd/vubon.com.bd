import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetMessageQuery extends BaseQuery {
  readonly type = 'support.message.get';

  constructor(public readonly messageId: string) {
    super();
  }
}
