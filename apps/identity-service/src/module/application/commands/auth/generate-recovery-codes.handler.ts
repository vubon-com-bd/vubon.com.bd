/**
 * Generate Recovery Codes Handler
 * @module identity-service/application/commands/auth
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateRecoveryCodesCommand } from './generate-recovery-codes.command.js';
import type { AuthRecoveryCodeServiceInterface } from '../../services/interfaces/auth-recovery-code.service.interface.js';
import { AUTH_RECOVERY_CODE_SERVICE } from '../../services/interfaces/auth-recovery-code.service.interface.js';

@CommandHandler(GenerateRecoveryCodesCommand)
export class GenerateRecoveryCodesHandler
  extends BaseCommandHandler<GenerateRecoveryCodesCommand, readonly string[]>
  implements ICommandHandler<GenerateRecoveryCodesCommand>
{
  readonly commandType = 'auth.generate-recovery-codes';

  constructor(
    @Inject(AUTH_RECOVERY_CODE_SERVICE)
    private readonly recoveryCodeService: AuthRecoveryCodeServiceInterface,
  ) {
    super();
  }

  async execute(command: GenerateRecoveryCodesCommand): Promise<readonly string[]> {
    const result = await this.recoveryCodeService.generate(
      command.authId,
      command.count ?? 10,
    );
    return result.codes;
  }
}
