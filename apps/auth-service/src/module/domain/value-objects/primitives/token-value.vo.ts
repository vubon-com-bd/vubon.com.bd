/**
 * TokenValueVO — Opaque JWT / refresh token value
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Non-empty, 8–4096 chars
 * - Segments split by '.' (JWT) or plain opaque
 * - Redacted in serialization
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidTokenError } from '../../errors/token.errors';

const MIN_LENGTH = 8;
const MAX_LENGTH = 4096;

export class TokenValueVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): TokenValueVO {
    if (typeof raw !== 'string') {
      throw new InvalidTokenError('Token value must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new InvalidTokenError('Token value too short');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidTokenError('Token value too long');
    }
    if (/\s/.test(trimmed)) {
      throw new InvalidTokenError('Token value must not contain whitespace');
    }
    return new TokenValueVO(trimmed);
  }

  /** True if the token looks like a JWT (3 segments). */
  isJwt(): boolean {
    return this.value.split('.').length === 3;
  }

  get masked(): string {
    if (this.value.length <= 10) return '***';
    return `${this.value.slice(0, 4)}…${this.value.slice(-4)}`;
  }

  override toJSON(): string {
    return this.masked;
  }

  override toString(): string {
    return this.masked;
  }
}
