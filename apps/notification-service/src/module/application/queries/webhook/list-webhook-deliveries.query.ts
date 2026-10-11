import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListWebhookDeliveriesRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class ListWebhookDeliveriesQuery extends BaseQuery {
  readonly type = 'webhook.list_deliveries';
  constructor(public readonly options: ListWebhookDeliveriesRequestDTO) { super(); }
}
