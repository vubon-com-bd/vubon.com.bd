import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProviderWebhookRequestDTO } from '../../dtos/requests/provider-webhook/provider-webhook.dto.js';

export class ProcessProviderWebhookCommand extends BaseCommand {
  readonly type = 'provider_webhook.process';
  constructor(public readonly dto: ProviderWebhookRequestDTO) {
    super();
  }
}
