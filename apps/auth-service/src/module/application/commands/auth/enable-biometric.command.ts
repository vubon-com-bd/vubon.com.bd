import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EnableBiometricCommand extends BaseCommand {
  readonly type = 'auth.enable-biometric';

  constructor(
    public readonly userId: string,
    public readonly biometricId: string,
    public readonly biometricType: string,
  ) {
    super();
  }
}
