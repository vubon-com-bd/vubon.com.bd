import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateRecoveryCodesCommand } from './generate-recovery-codes.command';
import type { AuthRecoveryCodeServiceInterface } from '../../services/interfaces/auth-recovery-code.service.interface';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto';
import { AUTH_RECOVERY_CODE_SERVICE } from '../../tokens';

@CommandHandler(GenerateRecoveryCodesCommand)
export class GenerateRecoveryCodesHandler
  extends BaseCommandHandler<GenerateRecoveryCodesCommand, RecoveryCodesResponseDTO>
  implements ICommandHandler<GenerateRecoveryCodesCommand> {
  readonly commandType = 'GenerateRecoveryCodesCommand';
  constructor(
    @Inject(AUTH_RECOVERY_CODE_SERVICE)
    private readonly recoveryService: AuthRecoveryCodeServiceInterface,
  ) { super(); }

  async execute(
    command: GenerateRecoveryCodesCommand,
  ): Promise<RecoveryCodesResponseDTO> {
    return this.recoveryService.generateForUser(
      command.userId,
      command.input.count,
      command.input.invalidatePrevious,
    );
  }
}
