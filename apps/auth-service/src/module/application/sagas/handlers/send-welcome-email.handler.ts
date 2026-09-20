import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendWelcomeEmailCommand } from '../commands/send-welcome-email.command';

@CommandHandler(SendWelcomeEmailCommand)
export class SendWelcomeEmailHandler implements ICommandHandler<SendWelcomeEmailCommand> {
  private readonly logger = new Logger(SendWelcomeEmailHandler.name);

  async execute(command: SendWelcomeEmailCommand): Promise<void> {
    this.logger.log(`📧 Welcome email: user=${command.userId}`);
  }
}
