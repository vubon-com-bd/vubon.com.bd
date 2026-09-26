import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EnableMfaCommand } from './enable-mfa.command';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface';
import { AUTH_MFA_SERVICE } from '../../tokens';

@CommandHandler(EnableMfaCommand)
export class EnableMfaHandler
  extends BaseCommandHandler<EnableMfaCommand, {
    secret: string;
    qrCodeUrl: string;
    recoveryCodes: readonly string[];
  }>
  implements ICommandHandler<EnableMfaCommand> {
  readonly commandType = 'EnableMfaCommand';
  constructor(
    @Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface,
  ) { super(); }

  async execute(command: EnableMfaCommand) {
    return this.mfaService.beginEnrollment(command.userId, command.input);
  }
}
