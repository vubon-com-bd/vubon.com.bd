import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendRecoveryCodeCommand } from '../commands/send-recovery-code.command';

@CommandHandler(SendRecoveryCodeCommand)
export class SendRecoveryCodeHandler implements ICommandHandler<SendRecoveryCodeCommand> {
  private readonly logger = new Logger(SendRecoveryCodeHandler.name);

  async execute(command: SendRecoveryCodeCommand): Promise<void> {
    this.logger.log(`📧 Recovery codes: user=${command.userId}`);
  }
}
