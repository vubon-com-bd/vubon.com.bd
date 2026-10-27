/**
 * UpdateAnalyticsHandler — handles UpdateAnalyticsCommand
 * @module notification-service/application/sagas/commands
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UpdateAnalyticsCommand } from './update-analytics.command.js';

@CommandHandler(UpdateAnalyticsCommand)
export class UpdateAnalyticsHandler implements ICommandHandler<UpdateAnalyticsCommand> {
  private readonly logger = new Logger(UpdateAnalyticsHandler.name);

  async execute(command: UpdateAnalyticsCommand): Promise<{ updated: boolean }> {
    this.logger.debug(
      `UpdateAnalyticsCommand received — eventType=${(command as unknown as { eventType?: string }).eventType ?? 'N/A'}`,
    );

    // In-memory mode: no-op
    // Production: would increment analytics counters
    return { updated: true };
  }
}
