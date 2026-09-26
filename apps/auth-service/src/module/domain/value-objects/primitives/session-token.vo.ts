/**
 * SessionTokenVO — Opaque session token value object
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Non-empty string, 16–512 chars
 * - URL-safe base64 / hex characters only
 * - Never logged (redact in toJSON)
 * - Timing-safe equality check
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidTokenError } from '../../errors/token.errors';

const MIN_LENGTH = 16;
const MAX_LENGTH = 512;
const TOKEN_REGEX = /^[A-Za-z0-9_\-./=+]+$/;

export class SessionTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): SessionTokenVO {
    if (typeof raw !== 'string') {
      throw new InvalidTokenError('Session token must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new InvalidTokenError(`Session token too short (min ${MIN_LENGTH})`);
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidTokenError(`Session token too long (max ${MAX_LENGTH})`);
    }
    if (!TOKEN_REGEX.test(trimmed)) {
      throw new InvalidTokenError('Session token contains invalid characters');
    }
    return new SessionTokenVO(trimmed);
  }

  /** Constant-time comparison against another token. */
  equalsConstantTime(other: SessionTokenVO): boolean {
    const a = this.value;
    const b = other.value;
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i += 1) {
      diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
  }

  /** Masked preview for logs, e.g. "abc1…f9xy" */
  get masked(): string {
    if (this.value.length <= 12) return '***';
    return `${this.value.slice(0, 4)}…${this.value.slice(-4)}`;
  }

  override toJSON(): string {
    return this.masked;
  }

  override toString(): string {
    return this.masked;
  }
}
