import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnlockAccountCommand } from './unlock-account.command.js';
import type { AuthAccountLockServiceInterface } from '../../services/interfaces/auth-account-lock.service.interface.js';
import { AUTH_ACCOUNT_LOCK_SERVICE } from '../../services/interfaces/auth-account-lock.service.interface.js';

export interface UnlockAccountResponse { readonly success: true; readonly unlocked: boolean; }

@CommandHandler(UnlockAccountCommand)
export class UnlockAccountHandler
  extends BaseCommandHandler<UnlockAccountCommand, UnlockAccountResponse>
  implements ICommandHandler<UnlockAccountCommand>
{
  readonly commandType = 'auth.unlock-account';
  constructor(@Inject(AUTH_ACCOUNT_LOCK_SERVICE) private readonly service: AuthAccountLockServiceInterface) { super(); }
  async execute(command: UnlockAccountCommand): Promise<UnlockAccountResponse> {
    await this.service.unlock(command.input.userId, command.unlockedBy);
    return { success: true, unlocked: true };
  }
}
