import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProcessProviderWebhookCommand } from './process-provider-webhook.command.js';
import {
  PROVIDER_WEBHOOK_SERVICE,
  type IProviderWebhookService,
} from '../../services/interfaces/provider-webhook.service.interface.js';
import type { ProviderWebhookProcessResultDTO } from '../../dtos/requests/provider-webhook/provider-webhook.dto.js';

@CommandHandler(ProcessProviderWebhookCommand)
export class ProcessProviderWebhookHandler
  implements ICommandHandler<ProcessProviderWebhookCommand, ProviderWebhookProcessResultDTO>
{
  constructor(@Inject(PROVIDER_WEBHOOK_SERVICE) private readonly service: IProviderWebhookService) {}

  async execute(c: ProcessProviderWebhookCommand): Promise<ProviderWebhookProcessResultDTO> {
    return this.service.process(c.dto);
  }
}
