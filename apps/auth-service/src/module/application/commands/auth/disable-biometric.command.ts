import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { DisableBiometricRequestDTO } from '../../dtos/requests/auth/disable-biometric.dto';

export class DisableBiometricCommand extends BaseCommand {
  readonly type = 'auth.disable-biometric';
  constructor(
    public readonly userId: UserId,
    public readonly input: DisableBiometricRequestDTO,
  ) { super(); }
}
