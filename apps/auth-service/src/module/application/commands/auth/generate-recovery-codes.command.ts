import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class GenerateRecoveryCodesCommand extends BaseCommand {
  readonly type = 'auth.generate-recovery-codes';

  constructor(
    public readonly userId: string,
    public readonly count: number = 10,
  ) {
    super();
  }
}
