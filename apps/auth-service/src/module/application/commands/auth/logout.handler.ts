import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LogoutCommand } from './logout.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import { AUTH_SERVICE } from '../../tokens';

@CommandHandler(LogoutCommand)
export class LogoutHandler
  extends BaseCommandHandler<LogoutCommand, void>
  implements ICommandHandler<LogoutCommand> {
  readonly commandType = 'LogoutCommand';
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) { super(); }

  async execute(command: LogoutCommand): Promise<void> {
    await this.authService.logout(command.input);
  }
}
