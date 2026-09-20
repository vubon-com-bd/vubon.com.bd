import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifyLoginCommand } from '../commands/notify-login.command';

@CommandHandler(NotifyLoginCommand)
export class NotifyLoginHandler implements ICommandHandler<NotifyLoginCommand> {
  private readonly logger = new Logger(NotifyLoginHandler.name);

  async execute(command: NotifyLoginCommand): Promise<void> {
    this.logger.log(`📧 Notify login: user=${command.userId} ip=${command.ip ?? 'unknown'}`);
  }
}
