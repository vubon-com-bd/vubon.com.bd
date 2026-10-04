import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetWebhookQuery extends BaseQuery {
  readonly type = 'webhook.get';
  constructor(public readonly webhookId: string) {
    super();
  }
}
