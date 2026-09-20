import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RecoverAccountCommand } from './recover-account.command';
import type { AuthRecoveryCodeServiceInterface } from '../../services/interfaces/auth-recovery-code.service.interface';
import { LoginFailedError } from '../../errors/auth.errors';

@CommandHandler(RecoverAccountCommand)
export class RecoverAccountHandler
  extends BaseCommandHandler<RecoverAccountCommand, boolean>
  implements ICommandHandler<RecoverAccountCommand>
{
  readonly commandType = 'auth.recover-account';

  constructor(
    @Inject('AuthRecoveryCodeService') @Inject('AuthRecoveryCodeService') private readonly recoveryCodeService: AuthRecoveryCodeServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RecoverAccountCommand): Promise<boolean> {
    const ok = await this.recoveryCodeService.consume(command.userId, command.code);
    if (!ok) {
      throw new LoginFailedError('invalid recovery code');
    }
    return true;
  }
}
