/**
 * OAuthProviderVO — Generic OAuth 2.0 provider
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

export type OAuthProviderValue =
  | 'google'
  | 'facebook'
  | 'github'
  | 'linkedin'
  | 'microsoft'
  | 'gitlab'
  | 'bitbucket'
  | 'custom';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'google', 'facebook', 'github', 'linkedin',
  'microsoft', 'gitlab', 'bitbucket', 'custom',
]);

export class OAuthProviderVO extends BaseTypeVO<OAuthProviderValue> {
  private constructor(value: OAuthProviderValue) {
    super(value);
  }

  static of(raw: string): OAuthProviderVO {
    const lower = raw.trim().toLowerCase();
    if (!ALLOWED.has(lower)) {
      throw new Error(`Unsupported OAuth provider: ${raw}`);
    }
    return new OAuthProviderVO(lower as OAuthProviderValue);
  }

  supportsRefresh(): boolean {
    return this.value !== 'custom';
  }
}
