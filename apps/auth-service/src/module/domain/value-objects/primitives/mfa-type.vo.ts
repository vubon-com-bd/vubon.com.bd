import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

const VALID_MFA_TYPES = new Set<string>([
  'totp',
  'sms',
  'email',
  'backup_code',
  'push',
  'webauthn',
]);

export class MfaTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MfaTypeVO {
    if (!VALID_MFA_TYPES.has(raw)) {
      throw new MfaInvalidError(`invalid MFA type: ${raw}`);
    }
    return new MfaTypeVO(raw);
  }
}
