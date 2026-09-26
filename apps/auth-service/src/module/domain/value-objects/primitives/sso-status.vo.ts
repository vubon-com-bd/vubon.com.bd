/**
 * SsoStatusVO — SSO session status
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export type SsoStatusValue = 'active' | 'expired' | 'revoked' | 'pending';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'active', 'expired', 'revoked', 'pending',
]);

export class SsoStatusVO extends BaseStatusVO<SsoStatusValue> {
  private constructor(value: SsoStatusValue) {
    super(value);
  }

  static of(raw: string): SsoStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown SSO status: ${raw}`);
    }
    return new SsoStatusVO(raw as SsoStatusValue);
  }

  override isActive(): boolean {
    return this.value === 'active';
  }
}
