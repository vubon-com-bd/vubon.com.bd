/**
 * MfaStatusVO — MFA lifecycle status
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

export type MfaStatusValue = 'disabled' | 'pending' | 'enabled' | 'suspended';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'disabled', 'pending', 'enabled', 'suspended',
]);

export class MfaStatusVO extends BaseStatusVO<MfaStatusValue> {
  private constructor(value: MfaStatusValue) {
    super(value);
  }

  static of(raw: string): MfaStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new MfaInvalidError(`Unknown MFA status: ${raw}`);
    }
    return new MfaStatusVO(raw as MfaStatusValue);
  }

  static disabled(): MfaStatusVO {
    return new MfaStatusVO('disabled');
  }

  static enabled(): MfaStatusVO {
    return new MfaStatusVO('enabled');
  }

  override isActive(): boolean {
    return this.value === 'enabled';
  }

  requiresVerification(): boolean {
    return this.value === 'enabled' || this.value === 'pending';
  }
}
