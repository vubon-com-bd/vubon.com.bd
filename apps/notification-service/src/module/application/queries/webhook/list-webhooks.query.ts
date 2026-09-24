import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListWebhooksQuery extends BaseQuery {
  readonly type = 'webhook.list';

  constructor(public readonly userId: string) {
    super();
  }
}
