import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SsoFailedError } from '../../errors/sso.errors';

const VALID = new Set<string>([
  'saml',
  'oidc',
  'google_workspace',
  'azure_ad',
  'okta',
]);

export class SsoProviderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SsoProviderVO {
    if (!VALID.has(raw)) {
      throw new SsoFailedError(raw, 'unsupported provider');
    }
    return new SsoProviderVO(raw);
  }
}
