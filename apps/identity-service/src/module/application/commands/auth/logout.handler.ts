import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LogoutCommand } from './logout.command.js';
import type { LogoutResponseDTO } from '../../dtos/responses/logout-response.dto.js';
import type { AuthSessionServiceInterface } from '../../services/interfaces/auth-session.service.interface.js';
import { AUTH_SESSION_SERVICE } from '../../services/interfaces/auth-session.service.interface.js';

@CommandHandler(LogoutCommand)
export class LogoutHandler
  extends BaseCommandHandler<LogoutCommand, LogoutResponseDTO>
  implements ICommandHandler<LogoutCommand>
{
  readonly commandType = 'auth.logout';
  constructor(@Inject(AUTH_SESSION_SERVICE) private readonly sessionService: AuthSessionServiceInterface) { super(); }
  async execute(command: LogoutCommand): Promise<LogoutResponseDTO> {
    if (command.input.sessionId) {
      await this.sessionService.revoke(command.input.sessionId, 'logout');
    } else if (command.userId) {
      await this.sessionService.revokeAllForUser(command.userId, 'logout');
    }
    return { success: true, message: 'Logged out successfully', loggedOutAt: new Date().toISOString() };
  }
}
