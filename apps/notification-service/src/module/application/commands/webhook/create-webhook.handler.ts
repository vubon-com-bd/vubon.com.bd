import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateWebhookCommand } from './create-webhook.command';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto';
import type { WebhookRepository } from '../../../domain/repositories/webhook.repository.interface';
import { WebhookEntity } from '../../../domain/entities/webhook.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { WebhookTypeVO } from '../../../domain/value-objects/primitives/webhook-type.vo';
import { WebhookUrlVO } from '../../../domain/value-objects/primitives/webhook-url.vo';
import { WebhookSecretVO } from '../../../domain/value-objects/primitives/webhook-secret.vo';
import { WebhookStatusVO } from '../../../domain/value-objects/primitives/webhook-status.vo';

@CommandHandler(CreateWebhookCommand)
export class CreateWebhookHandler
  extends BaseCommandHandler<CreateWebhookCommand, WebhookResponseDTO>
  implements ICommandHandler<CreateWebhookCommand>
{
  readonly commandType = 'webhook.create';

  constructor(private readonly webhookRepo: WebhookRepository) {
    super();
  }

  async execute(command: CreateWebhookCommand): Promise<WebhookResponseDTO> {
    const secret = command.secret ?? crypto.randomUUID().replace(/-/g, '');

    const entity = WebhookEntity.create({
      userId: UserIdVO.create(command.userId),
      type: WebhookTypeVO.create(command.webhookType),
      url: WebhookUrlVO.create(command.url),
      secret: WebhookSecretVO.create(secret),
      status: WebhookStatusVO.create('active'),
      events: command.events,
    });

    const saved = await this.webhookRepo.save(entity);

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
