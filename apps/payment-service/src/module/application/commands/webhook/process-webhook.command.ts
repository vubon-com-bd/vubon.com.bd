import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProcessWebhookRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class ProcessWebhookCommand extends BaseCommand {
  readonly type = 'webhook.process';
  constructor(public readonly dto: ProcessWebhookRequestDTO) {
    super();
  }
}
