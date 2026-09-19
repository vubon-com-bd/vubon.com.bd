import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DisableBiometricCommand extends BaseCommand {
  readonly type = 'auth.disable-biometric';

  constructor(public readonly userId: string) {
    super();
  }
}
