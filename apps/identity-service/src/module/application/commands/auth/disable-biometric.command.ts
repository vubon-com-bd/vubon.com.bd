import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DisableBiometricRequestDTO } from '../../dtos/requests/auth/disable-biometric.dto.js';
export class DisableBiometricCommand extends BaseCommand {
  readonly type = 'auth.disable-biometric';
  readonly commandType = 'auth.disable-biometric';
  constructor(public readonly authId: string, public readonly input: DisableBiometricRequestDTO) { super(); }
}
