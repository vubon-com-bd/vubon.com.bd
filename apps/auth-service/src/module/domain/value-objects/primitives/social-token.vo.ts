/**
 * SocialTokenVO — Access/refresh token issued by social provider
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SocialTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): SocialTokenVO {
    if (typeof raw !== 'string') {
      throw new Error('Social token must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < 8 || trimmed.length > 4096) {
      throw new Error('Social token length invalid');
    }
    if (/\s/.test(trimmed)) {
      throw new Error('Social token must not contain whitespace');
    }
    return new SocialTokenVO(trimmed);
  }

  get masked(): string {
    return `${this.value.slice(0, 4)}…${this.value.slice(-4)}`;
  }

  override toJSON(): string {
    return this.masked;
  }
}
