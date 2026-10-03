/**
 * OAuthStatusVO — OAuth link status
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export type OAuthStatusValue = 'active' | 'expired' | 'revoked';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'active', 'expired', 'revoked',
]);

export class OAuthStatusVO extends BaseStatusVO<OAuthStatusValue> {
  private constructor(value: OAuthStatusValue) {
    super(value);
  }

  static of(raw: string): OAuthStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown OAuth status: ${raw}`);
    }
    return new OAuthStatusVO(raw as OAuthStatusValue);
  }

  needsRefresh(): boolean {
    return this.value === 'expired';
  }
}
