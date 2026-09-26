import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { VerifyBiometricRequestDTO } from '../../dtos/requests/auth/verify-biometric.dto';

export class VerifyBiometricCommand extends BaseCommand {
  readonly type = 'auth.verify-biometric';
  constructor(public readonly input: VerifyBiometricRequestDTO) { super(); }
}
