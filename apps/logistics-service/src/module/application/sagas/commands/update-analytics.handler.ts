import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateAnalyticsCommand } from './update-analytics.command.js';

/**
 * UpdateAnalyticsHandler — saga-side command handler (placeholder)
 * TODO: wire to notification-service, order-service, etc.
 */
@Injectable()
@CommandHandler(UpdateAnalyticsCommand)
export class UpdateAnalyticsHandler implements ICommandHandler<UpdateAnalyticsCommand, { success: boolean }> {
  private readonly logger = new Logger(UpdateAnalyticsHandler.name);
  async execute(c: UpdateAnalyticsCommand): Promise<{ success: boolean }> {
    this.logger.log(`[UpdateAnalytics] payload=${JSON.stringify(c.payload)}`);
    return { success: true };
  }
}
