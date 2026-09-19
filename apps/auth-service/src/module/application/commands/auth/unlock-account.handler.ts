import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnlockAccountCommand } from './unlock-account.command';
import type { AuthAccountLockServiceInterface } from '../../services/interfaces/auth-account-lock.service.interface';

@CommandHandler(UnlockAccountCommand)
export class UnlockAccountHandler
  extends BaseCommandHandler<UnlockAccountCommand, void>
  implements ICommandHandler<UnlockAccountCommand>
{
  readonly commandType = 'auth.unlock-account';

  constructor(
    private readonly lockService: AuthAccountLockServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UnlockAccountCommand): Promise<void> {
    await this.lockService.unlock(command.userId, command.reason);
  }
}
