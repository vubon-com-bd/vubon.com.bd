import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DisableMfaCommand } from './disable-mfa.command.js';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto.js';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../services/interfaces/auth-mfa.service.interface.js';

@CommandHandler(DisableMfaCommand)
export class DisableMfaHandler
  extends BaseCommandHandler<DisableMfaCommand, MfaResponseDTO>
  implements ICommandHandler<DisableMfaCommand>
{
  readonly commandType = 'auth.disable-mfa';
  constructor(@Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface) { super(); }
  async execute(command: DisableMfaCommand): Promise<MfaResponseDTO> {
    return this.mfaService.disable(command.authId);
  }
}
