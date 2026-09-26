import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyMfaCommand } from './verify-mfa.command';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface';
import { AUTH_MFA_SERVICE } from '../../tokens';

@CommandHandler(VerifyMfaCommand)
export class VerifyMfaHandler
  extends BaseCommandHandler<VerifyMfaCommand, boolean>
  implements ICommandHandler<VerifyMfaCommand> {
  readonly commandType = 'VerifyMfaCommand';
  constructor(
    @Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface,
  ) { super(); }

  async execute(command: VerifyMfaCommand): Promise<boolean> {
    return this.mfaService.verify(command.input, command.userId);
  }
}
