import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

const VALID_MFA_STATUSES = new Set<string>([
  'enabled',
  'disabled',
  'pending',
  'verified',
]);

export class MfaStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MfaStatusVO {
    if (!VALID_MFA_STATUSES.has(raw)) {
      throw new MfaInvalidError(`invalid MFA status: ${raw}`);
    }
    return new MfaStatusVO(raw);
  }
}
