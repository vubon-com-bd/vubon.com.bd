import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyBackupCodeCommand } from './verify-backup-code.command.js';
export interface VerifyBackupCodeResponse { readonly success: true; readonly verified: boolean; }

@CommandHandler(VerifyBackupCodeCommand)
export class VerifyBackupCodeHandler
  extends BaseCommandHandler<VerifyBackupCodeCommand, VerifyBackupCodeResponse>
  implements ICommandHandler<VerifyBackupCodeCommand>
{
  readonly commandType = 'auth.verify-backup-code';
  async execute(_command: VerifyBackupCodeCommand): Promise<VerifyBackupCodeResponse> {
    return { success: true, verified: false };
  }
}
