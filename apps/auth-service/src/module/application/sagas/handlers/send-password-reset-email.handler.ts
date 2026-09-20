import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendPasswordResetEmailCommand } from '../commands/send-password-reset-email.command';

@CommandHandler(SendPasswordResetEmailCommand)
export class SendPasswordResetEmailHandler implements ICommandHandler<SendPasswordResetEmailCommand> {
  private readonly logger = new Logger(SendPasswordResetEmailHandler.name);

  async execute(command: SendPasswordResetEmailCommand): Promise<void> {
    this.logger.log(`📧 Password reset: user=${command.userId} email=${command.email}`);
  }
}
