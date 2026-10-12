import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetupMfaCommand } from './setup-mfa.command.js';
import type { MfaSetupResponseDTO } from '../../dtos/responses/mfa-response.dto.js';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../services/interfaces/auth-mfa.service.interface.js';

@CommandHandler(SetupMfaCommand)
export class SetupMfaHandler
  extends BaseCommandHandler<SetupMfaCommand, MfaSetupResponseDTO>
  implements ICommandHandler<SetupMfaCommand>
{
  readonly commandType = 'auth.setup-mfa';
  constructor(@Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface) { super(); }
  async execute(command: SetupMfaCommand): Promise<MfaSetupResponseDTO> {
    return this.mfaService.setup(command.authId);
  }
}
