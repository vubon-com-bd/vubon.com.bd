/**
 * SsoTokenVO — SAML assertion / OIDC token
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SsoTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): SsoTokenVO {
    if (typeof raw !== 'string') {
      throw new Error('SSO token must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < 16 || trimmed.length > 8192) {
      throw new Error('SSO token length invalid');
    }
    return new SsoTokenVO(trimmed);
  }

  get masked(): string {
    return `${this.value.slice(0, 6)}…${this.value.slice(-6)}`;
  }

  override toJSON(): string {
    return this.masked;
  }
}
