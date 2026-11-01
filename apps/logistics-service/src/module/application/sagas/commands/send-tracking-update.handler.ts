import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { SendTrackingUpdateCommand } from './send-tracking-update.command.js';

/**
 * SendTrackingUpdateHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(SendTrackingUpdateCommand)
export class SendTrackingUpdateHandler implements ICommandHandler<SendTrackingUpdateCommand, { success: boolean }> {
  private readonly logger = new Logger(SendTrackingUpdateHandler.name);
  async execute(c: SendTrackingUpdateCommand): Promise<{ success: boolean }> {
    this.logger.log(`[SendTrackingUpdate] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
