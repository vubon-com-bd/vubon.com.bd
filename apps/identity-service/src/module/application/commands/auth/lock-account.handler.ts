import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LockAccountCommand } from './lock-account.command.js';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto.js';
import type { AuthAccountLockServiceInterface } from '../../services/interfaces/auth-account-lock.service.interface.js';
import { AUTH_ACCOUNT_LOCK_SERVICE } from '../../services/interfaces/auth-account-lock.service.interface.js';

@CommandHandler(LockAccountCommand)
export class LockAccountHandler
  extends BaseCommandHandler<LockAccountCommand, AuthAccountLockResponseDTO>
  implements ICommandHandler<LockAccountCommand>
{
  readonly commandType = 'auth.lock-account';
  constructor(@Inject(AUTH_ACCOUNT_LOCK_SERVICE) private readonly service: AuthAccountLockServiceInterface) { super(); }
  async execute(command: LockAccountCommand): Promise<AuthAccountLockResponseDTO> {
    return this.service.lock(command.input.userId, command.input.reason, command.input.durationSeconds);
  }
}
