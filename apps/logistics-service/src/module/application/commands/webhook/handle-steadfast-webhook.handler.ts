import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleSteadfastWebhookCommand } from './handle-steadfast-webhook.command.js';

/**
 * Steadfast webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleSteadfastWebhookCommand)
export class HandleSteadfastWebhookHandler
  implements ICommandHandler<HandleSteadfastWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleSteadfastWebhookHandler.name);

  async execute(c: HandleSteadfastWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Steadfast webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Steadfast] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
