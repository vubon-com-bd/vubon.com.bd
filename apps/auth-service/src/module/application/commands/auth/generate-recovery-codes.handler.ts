import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateRecoveryCodesCommand } from './generate-recovery-codes.command';
import type { AuthRecoveryCodeServiceInterface } from '../../services/interfaces/auth-recovery-code.service.interface';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto';

@CommandHandler(GenerateRecoveryCodesCommand)
export class GenerateRecoveryCodesHandler
  extends BaseCommandHandler<GenerateRecoveryCodesCommand, RecoveryCodesResponseDTO>
  implements ICommandHandler<GenerateRecoveryCodesCommand>
{
  readonly commandType = 'auth.generate-recovery-codes';

  constructor(
    private readonly recoveryCodeService: AuthRecoveryCodeServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: GenerateRecoveryCodesCommand): Promise<RecoveryCodesResponseDTO> {
    return this.recoveryCodeService.generate(command.userId, command.count);
  }
}
