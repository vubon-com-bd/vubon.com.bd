import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListWebhooksRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class ListWebhooksQuery extends BaseQuery {
  readonly type = 'webhook.list';
  constructor(public readonly options: ListWebhooksRequestDTO) { super(); }
}
