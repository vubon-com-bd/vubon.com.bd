import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAnalyticsCommand } from '../commands/update-analytics.command';

@CommandHandler(UpdateAnalyticsCommand)
export class UpdateAnalyticsHandler implements ICommandHandler<UpdateAnalyticsCommand> {
  private readonly logger = new Logger(UpdateAnalyticsHandler.name);

  async execute(command: UpdateAnalyticsCommand): Promise<void> {
    this.logger.log(`📊 Analytics: ${command.eventType} user=${command.userId}`);
  }
}
