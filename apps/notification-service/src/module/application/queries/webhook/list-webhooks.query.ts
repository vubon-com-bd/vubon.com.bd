import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { WebhookListOptionsDTO } from '@application/services/interfaces/webhook.service.interface.js';

export class ListWebhooksQuery extends BaseQuery {
  readonly type = 'notification.webhook.list';
  constructor(public readonly options: WebhookListOptionsDTO) { super(); }
}
