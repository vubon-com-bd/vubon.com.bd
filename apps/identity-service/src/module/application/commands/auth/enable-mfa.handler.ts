import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EnableMfaCommand } from './enable-mfa.command.js';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto.js';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../services/interfaces/auth-mfa.service.interface.js';

@CommandHandler(EnableMfaCommand)
export class EnableMfaHandler
  extends BaseCommandHandler<EnableMfaCommand, MfaResponseDTO>
  implements ICommandHandler<EnableMfaCommand>
{
  readonly commandType = 'auth.enable-mfa';
  constructor(@Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface) { super(); }
  async execute(command: EnableMfaCommand): Promise<MfaResponseDTO> {
    return this.mfaService.enable(command.input);
  }
}
