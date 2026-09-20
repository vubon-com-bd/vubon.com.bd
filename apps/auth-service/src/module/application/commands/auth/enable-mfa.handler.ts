import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EnableMfaCommand } from './enable-mfa.command';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto';

@CommandHandler(EnableMfaCommand)
export class EnableMfaHandler
  extends BaseCommandHandler<EnableMfaCommand, MfaResponseDTO>
  implements ICommandHandler<EnableMfaCommand>
{
  readonly commandType = 'auth.enable-mfa';

  constructor(
    @Inject('AuthMfaService') @Inject('AuthMfaService') private readonly mfaService: AuthMfaServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: EnableMfaCommand): Promise<MfaResponseDTO> {
    return this.mfaService.setup(command.userId, command.method);
  }
}
