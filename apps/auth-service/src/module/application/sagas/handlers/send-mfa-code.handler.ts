import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMfaCodeCommand } from '../commands/send-mfa-code.command';

@CommandHandler(SendMfaCodeCommand)
export class SendMfaCodeHandler implements ICommandHandler<SendMfaCodeCommand> {
  private readonly logger = new Logger(SendMfaCodeHandler.name);

  async execute(command: SendMfaCodeCommand): Promise<void> {
    this.logger.log(`📧 MFA code: user=${command.userId} method=${command.method}`);
  }
}
