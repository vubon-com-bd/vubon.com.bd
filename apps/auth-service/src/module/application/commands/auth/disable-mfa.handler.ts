import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DisableMfaCommand } from './disable-mfa.command';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface';

@CommandHandler(DisableMfaCommand)
export class DisableMfaHandler
  extends BaseCommandHandler<DisableMfaCommand, void>
  implements ICommandHandler<DisableMfaCommand>
{
  readonly commandType = 'auth.disable-mfa';

  constructor(
    private readonly mfaService: AuthMfaServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DisableMfaCommand): Promise<void> {
    await this.mfaService.disable(command.userId);
  }
}
