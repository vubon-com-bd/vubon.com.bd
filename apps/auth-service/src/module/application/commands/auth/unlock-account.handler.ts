import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnlockAccountCommand } from './unlock-account.command';
import type { AuthAccountLockServiceInterface } from '../../services/interfaces/auth-account-lock.service.interface';
import type { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AUTH_ACCOUNT_LOCK_SERVICE } from '../../tokens';

@CommandHandler(UnlockAccountCommand)
export class UnlockAccountHandler
  extends BaseCommandHandler<UnlockAccountCommand, AuthAccountLockEntity>
  implements ICommandHandler<UnlockAccountCommand> {
  readonly commandType = 'UnlockAccountCommand';
  constructor(
    @Inject(AUTH_ACCOUNT_LOCK_SERVICE)
    private readonly lockService: AuthAccountLockServiceInterface,
  ) { super(); }

  async execute(command: UnlockAccountCommand): Promise<AuthAccountLockEntity> {
    return this.lockService.unlock(command.input);
  }
}
