import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DisableMfaCommand } from './disable-mfa.command';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface';
import { AUTH_MFA_SERVICE } from '../../tokens';

@CommandHandler(DisableMfaCommand)
export class DisableMfaHandler
  extends BaseCommandHandler<DisableMfaCommand, void>
  implements ICommandHandler<DisableMfaCommand> {
  readonly commandType = 'DisableMfaCommand';
  constructor(
    @Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface,
  ) { super(); }

  async execute(command: DisableMfaCommand): Promise<void> {
    await this.mfaService.disable(command.userId, command.input);
  }
}
