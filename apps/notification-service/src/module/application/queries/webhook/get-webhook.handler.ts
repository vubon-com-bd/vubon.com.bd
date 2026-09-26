import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetWebhookQuery } from './get-webhook.query';
import type { WebhookRepository } from '../../../domain/repositories/webhook.repository.interface';
import { WebhookIdVO } from '../../../domain/value-objects/primitives/webhook-id.vo';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto';

@QueryHandler(GetWebhookQuery)
export class GetWebhookHandler
  extends BaseQueryHandler<GetWebhookQuery, WebhookResponseDTO | null>
  implements IQueryHandler<GetWebhookQuery>
{
  readonly queryType = 'webhook.get';

  constructor(private readonly webhookRepo: WebhookRepository) {
    super();
  }

  async execute(query: GetWebhookQuery): Promise<WebhookResponseDTO | null> {
    const entity = await this.webhookRepo.findById(WebhookIdVO.create(query.webhookId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      url: entity.url.value,
      status: entity.status.value,
      events: entity.events,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
