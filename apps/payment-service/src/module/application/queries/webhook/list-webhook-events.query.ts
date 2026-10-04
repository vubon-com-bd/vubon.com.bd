import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListWebhookEventsRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class ListWebhookEventsQuery extends BaseQuery {
  readonly type = 'webhook.list';
  constructor(public readonly options: ListWebhookEventsRequestDTO) {
    super();
  }
}
