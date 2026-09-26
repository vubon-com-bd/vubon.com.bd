import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LockAccountCommand } from './lock-account.command';
import type { AuthAccountLockServiceInterface } from '../../services/interfaces/auth-account-lock.service.interface';
import type { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AUTH_ACCOUNT_LOCK_SERVICE } from '../../tokens';

@CommandHandler(LockAccountCommand)
export class LockAccountHandler
  extends BaseCommandHandler<LockAccountCommand, AuthAccountLockEntity>
  implements ICommandHandler<LockAccountCommand> {
  readonly commandType = 'LockAccountCommand';
  constructor(
    @Inject(AUTH_ACCOUNT_LOCK_SERVICE)
    private readonly lockService: AuthAccountLockServiceInterface,
  ) { super(); }

  async execute(command: LockAccountCommand): Promise<AuthAccountLockEntity> {
    return this.lockService.lock(command.input);
  }
}
