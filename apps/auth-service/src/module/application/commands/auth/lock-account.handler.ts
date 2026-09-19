import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LockAccountCommand } from './lock-account.command';
import type { AuthAccountLockServiceInterface } from '../../services/interfaces/auth-account-lock.service.interface';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto';

@CommandHandler(LockAccountCommand)
export class LockAccountHandler
  extends BaseCommandHandler<LockAccountCommand, AuthAccountLockResponseDTO>
  implements ICommandHandler<LockAccountCommand>
{
  readonly commandType = 'auth.lock-account';

  constructor(
    private readonly lockService: AuthAccountLockServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: LockAccountCommand): Promise<AuthAccountLockResponseDTO> {
    return this.lockService.lock(command.userId, command.reason, command.durationMs);
  }
}
