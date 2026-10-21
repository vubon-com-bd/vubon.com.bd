/**
 * HandleNagadWebhookCommand
 * @module payment-service/application/commands/webhook
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { NagadWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleNagadWebhookCommand extends BaseCommand {
  readonly type = 'payment.webhook.nagad';
  constructor(public readonly dto: NagadWebhookRequestDTO) {
    super();
  }
}
