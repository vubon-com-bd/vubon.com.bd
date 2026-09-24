import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateWebhookCommand } from './update-webhook.command';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto';
import type { WebhookRepository } from '../../../domain/repositories/webhook.repository.interface';
import { WebhookEntity } from '../../../domain/entities/webhook.entity';
import { WebhookIdVO } from '../../../domain/value-objects/primitives/webhook-id.vo';
import { WebhookUrlVO } from '../../../domain/value-objects/primitives/webhook-url.vo';
import { WebhookStatusVO } from '../../../domain/value-objects/primitives/webhook-status.vo';

@CommandHandler(UpdateWebhookCommand)
export class UpdateWebhookHandler
  extends BaseCommandHandler<UpdateWebhookCommand, WebhookResponseDTO>
  implements ICommandHandler<UpdateWebhookCommand>
{
  readonly commandType = 'webhook.update';

  constructor(private readonly webhookRepo: WebhookRepository) {
    super();
  }

  async execute(command: UpdateWebhookCommand): Promise<WebhookResponseDTO> {
    const entity = await this.webhookRepo.findById(WebhookIdVO.create(command.webhookId));
    if (!entity) throw new Error(`Webhook not found: ${command.webhookId}`);

    const updated = WebhookEntity.reconstitute(
      entity.id,
      {
        userId: entity.userId,
        type: entity.type,
        url: command.url ? WebhookUrlVO.create(command.url) : entity.url,
        secret: entity.secret,
        status: command.status ? WebhookStatusVO.create(command.status) : entity.status,
        events: command.events ?? entity.events,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    const saved = await this.webhookRepo.save(updated);

    return {
      id: saved.id.value,
      userId: saved.userId.value,
      type: saved.type.value,
      url: saved.url.value,
      status: saved.status.value,
      events: saved.events,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }
}
