import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { EnableBiometricRequestDTO } from '../../dtos/requests/auth/enable-biometric.dto';

export class EnableBiometricCommand extends BaseCommand {
  readonly type = 'auth.enable-biometric';
  constructor(
    public readonly userId: UserId,
    public readonly input: EnableBiometricRequestDTO,
  ) { super(); }
}
