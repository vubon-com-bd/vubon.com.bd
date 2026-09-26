/**
 * OAuthTokenVO — OAuth 2.0 access/refresh token
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class OAuthTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): OAuthTokenVO {
    if (typeof raw !== 'string') {
      throw new Error('OAuth token must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < 8 || trimmed.length > 4096) {
      throw new Error('OAuth token length invalid');
    }
    return new OAuthTokenVO(trimmed);
  }

  get masked(): string {
    return `${this.value.slice(0, 4)}…${this.value.slice(-4)}`;
  }

  override toJSON(): string {
    return this.masked;
  }
}
