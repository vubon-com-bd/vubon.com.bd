import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LogoutCommand } from './logout.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';

@CommandHandler(LogoutCommand)
export class LogoutHandler
  extends BaseCommandHandler<LogoutCommand, void>
  implements ICommandHandler<LogoutCommand>
{
  readonly commandType = 'auth.logout';

  constructor(
    @Inject('AuthService') private readonly authService: AuthServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: LogoutCommand): Promise<void> {
    await this.authService.logout(command.sessionId);
  }
}
