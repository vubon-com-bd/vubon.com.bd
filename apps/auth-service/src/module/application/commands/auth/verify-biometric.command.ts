import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class VerifyBiometricCommand extends BaseCommand {
  readonly type = 'auth.verify-biometric';

  constructor(
    public readonly userId: string,
    public readonly biometricId: string,
  ) {
    super();
  }
}
