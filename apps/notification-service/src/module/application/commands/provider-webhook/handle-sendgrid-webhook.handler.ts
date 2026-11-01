/**
 * HandleSendgridWebhookHandler
 * @module notification-service/application/commands/provider-webhook
 *
 * Processes SendGrid delivery feedback → updates delivery status।
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { HandleSendgridWebhookCommand } from './handle-sendgrid-webhook.command.js';
import {
  NOTIFICATION_DELIVERY_REPOSITORY,
  type NotificationDeliveryRepository,
} from '@domain/repositories/notification-delivery.repository.interface.js';

export interface HandleSendgridWebhookResult {
  readonly processed: number;
  readonly skipped: number;
  readonly failed: number;
}

@CommandHandler(HandleSendgridWebhookCommand)
export class HandleSendgridWebhookHandler
  implements ICommandHandler<HandleSendgridWebhookCommand, HandleSendgridWebhookResult>
{
  private readonly logger = new Logger(HandleSendgridWebhookHandler.name);

  constructor(
    @Inject(NOTIFICATION_DELIVERY_REPOSITORY)
    private readonly repo: NotificationDeliveryRepository,
  ) {}

  async execute(c: HandleSendgridWebhookCommand): Promise<HandleSendgridWebhookResult> {
    let processed = 0;
    let skipped = 0;
    let failed = 0;

    for (const event of c.dto.events) {
      try {
        // Look up delivery by sg_message_id (provider message id)
        const deliveries = await this.repo.findByStatus('sent');
        const match = deliveries.find(
          (d) => d.delivery.providerMessageId?.value === event.sg_message_id,
        );

        if (!match) {
          skipped++;
          continue;
        }

        if (event.event === 'delivered') {
          match.transitionTo(
            // Assumes DeliveryStatusVO
            (await import('@domain/primitives/delivery-status.vo.js')).DeliveryStatusVO.delivered(),
          );
          await this.repo.save(match);
          processed++;
        } else if (event.event === 'bounce' || event.event === 'dropped') {
          match.transitionTo(
            (await import('@domain/primitives/delivery-status.vo.js')).DeliveryStatusVO.failed(),
          );
          await this.repo.save(match);
          processed++;
        } else {
          skipped++;
        }
      } catch (e) {
        failed++;
        const msg = e instanceof Error ? e.message : 'Unknown';
        this.logger.error(`SendGrid event processing failed: ${msg}`);
      }
    }

    this.logger.log(
      `SendGrid webhook: processed=${processed} skipped=${skipped} failed=${failed}`,
    );
    return { processed, skipped, failed };
  }
}
