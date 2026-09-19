import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyMfaCommand } from './verify-mfa.command';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface';
import { MfaVerificationFailedError } from '../../errors/mfa.errors';

@CommandHandler(VerifyMfaCommand)
export class VerifyMfaHandler
  extends BaseCommandHandler<VerifyMfaCommand, boolean>
  implements ICommandHandler<VerifyMfaCommand>
{
  readonly commandType = 'auth.verify-mfa';

  constructor(
    private readonly mfaService: AuthMfaServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: VerifyMfaCommand): Promise<boolean> {
    const valid = await this.mfaService.verify(command.userId, command.code);
    if (!valid) {
      throw new MfaVerificationFailedError('invalid code');
    }
    return true;
  }
}
