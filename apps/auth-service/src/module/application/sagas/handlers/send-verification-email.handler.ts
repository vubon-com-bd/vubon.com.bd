import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendVerificationEmailCommand } from '../commands/send-verification-email.command';

@CommandHandler(SendVerificationEmailCommand)
export class SendVerificationEmailHandler implements ICommandHandler<SendVerificationEmailCommand> {
  private readonly logger = new Logger(SendVerificationEmailHandler.name);

  async execute(command: SendVerificationEmailCommand): Promise<void> {
    this.logger.log(`📧 Verification email: user=${command.userId} email=${command.email}`);
  }
}
