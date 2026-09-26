/**
 * SocialProviderVO — External social identity provider
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

export type SocialProviderValue =
  | 'google'
  | 'facebook'
  | 'apple'
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'tiktok'
  | 'instagram';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'google', 'facebook', 'apple', 'twitter',
  'github', 'linkedin', 'tiktok', 'instagram',
]);

export class SocialProviderVO extends BaseTypeVO<SocialProviderValue> {
  private constructor(value: SocialProviderValue) {
    super(value);
  }

  static of(raw: string): SocialProviderVO {
    const lower = raw.trim().toLowerCase();
    if (!ALLOWED.has(lower)) {
      throw new Error(`Unsupported social provider: ${raw}`);
    }
    return new SocialProviderVO(lower as SocialProviderValue);
  }

  isEnterprise(): boolean {
    return this.value === 'linkedin' || this.value === 'github';
  }
}
