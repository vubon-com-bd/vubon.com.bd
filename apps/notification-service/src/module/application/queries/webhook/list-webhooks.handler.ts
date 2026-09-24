import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListWebhooksQuery } from './list-webhooks.query';
import type { WebhookRepository } from '../../../domain/repositories/webhook.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto';

@QueryHandler(ListWebhooksQuery)
export class ListWebhooksHandler
  extends BaseQueryHandler<ListWebhooksQuery, readonly WebhookResponseDTO[]>
  implements IQueryHandler<ListWebhooksQuery>
{
  readonly queryType = 'webhook.list';

  constructor(private readonly webhookRepo: WebhookRepository) {
    super();
  }

  async execute(query: ListWebhooksQuery): Promise<readonly WebhookResponseDTO[]> {
    const entities = await this.webhookRepo.findByUser(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id.value,
      userId: e.userId.value,
      type: e.type.value,
      url: e.url.value,
      status: e.status.value,
      events: e.events,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
  }
}
