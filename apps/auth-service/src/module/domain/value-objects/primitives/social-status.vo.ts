/**
 * SocialStatusVO — Status of a social link
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export type SocialStatusValue =
  | 'active'
  | 'revoked'
  | 'expired'
  | 'pending';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'active', 'revoked', 'expired', 'pending',
]);

export class SocialStatusVO extends BaseStatusVO<SocialStatusValue> {
  private constructor(value: SocialStatusValue) {
    super(value);
  }

  static of(raw: string): SocialStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown social status: ${raw}`);
    }
    return new SocialStatusVO(raw as SocialStatusValue);
  }

  override isActive(): boolean {
    return this.value === 'active';
  }
}
