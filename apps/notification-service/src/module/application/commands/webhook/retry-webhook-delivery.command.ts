import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RetryWebhookDeliveryRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class RetryWebhookDeliveryCommand extends BaseCommand {
  readonly type = 'webhook.retry_delivery';
  constructor(public readonly dto: RetryWebhookDeliveryRequestDTO, public readonly actorId?: string) {
    super();
  }
}
