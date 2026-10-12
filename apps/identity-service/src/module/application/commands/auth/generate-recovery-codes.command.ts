/**
 * Generate Recovery Codes Command
 * @module identity-service/application/commands/auth
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class GenerateRecoveryCodesCommand extends BaseCommand {
  readonly type = 'auth.generate-recovery-codes';
  readonly commandType = 'auth.generate-recovery-codes';

  constructor(
    public readonly authId: string,
    public readonly count?: number,
  ) {
    super();
  }
}
