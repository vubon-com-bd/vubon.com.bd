import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyMfaCommand } from './verify-mfa.command.js';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto.js';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../services/interfaces/auth-mfa.service.interface.js';

@CommandHandler(VerifyMfaCommand)
export class VerifyMfaHandler
  extends BaseCommandHandler<VerifyMfaCommand, MfaResponseDTO>
  implements ICommandHandler<VerifyMfaCommand>
{
  readonly commandType = 'auth.verify-mfa';
  constructor(@Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface) { super(); }
  async execute(command: VerifyMfaCommand): Promise<MfaResponseDTO> {
    return this.mfaService.verify(command.input);
  }
}
