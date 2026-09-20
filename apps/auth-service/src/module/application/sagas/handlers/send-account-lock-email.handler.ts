import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendAccountLockEmailCommand } from '../commands/send-account-lock-email.command';

@CommandHandler(SendAccountLockEmailCommand)
export class SendAccountLockEmailHandler implements ICommandHandler<SendAccountLockEmailCommand> {
  private readonly logger = new Logger(SendAccountLockEmailHandler.name);

  async execute(command: SendAccountLockEmailCommand): Promise<void> {
    this.logger.log(`📧 Account lock email: user=${command.userId} reason=${command.reason}`);
  }
}
