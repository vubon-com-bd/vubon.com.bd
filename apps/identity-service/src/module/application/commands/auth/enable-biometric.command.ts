import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { EnableBiometricRequestDTO } from '../../dtos/requests/auth/enable-biometric.dto.js';
export class EnableBiometricCommand extends BaseCommand {
  readonly type = 'auth.enable-biometric';
  readonly commandType = 'auth.enable-biometric';
  constructor(public readonly authId: string, public readonly input: EnableBiometricRequestDTO) { super(); }
}
