import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

const VALID_RECOVERY_STATUSES = new Set<string>([
  'active',
  'used',
  'expired',
  'revoked',
]);

export class RecoveryCodeStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RecoveryCodeStatusVO {
    if (!VALID_RECOVERY_STATUSES.has(raw)) {
      throw new MfaInvalidError(`invalid recovery code status: ${raw}`);
    }
    return new RecoveryCodeStatusVO(raw);
  }
}
