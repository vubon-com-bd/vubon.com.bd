/**
 * MfaTypeVO — MFA method type
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

export type MfaTypeValue = 'totp' | 'sms' | 'email' | 'webauthn' | 'push';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'totp', 'sms', 'email', 'webauthn', 'push',
]);

export class MfaTypeVO extends BaseTypeVO<MfaTypeValue> {
  private constructor(value: MfaTypeValue) {
    super(value);
  }

  static of(raw: string): MfaTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new MfaInvalidError(`Unknown MFA type: ${raw}`);
    }
    return new MfaTypeVO(raw as MfaTypeValue);
  }

  isHardware(): boolean {
    return this.value === 'webauthn';
  }

  isOutOfBand(): boolean {
    return this.value === 'sms' || this.value === 'email' || this.value === 'push';
  }
}
