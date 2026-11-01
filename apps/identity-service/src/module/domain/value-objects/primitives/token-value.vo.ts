/**
 * TokenValue Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Wraps JWT / opaque tokens. Validation: min length only (format varies).
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidTokenFormatError } from '../../errors/token.errors.js';

export class TokenValueVO extends BaseCodeVO {
  private static readonly MIN_LENGTH = 16;
  private static readonly MAX_LENGTH = 8192;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TokenValueVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidTokenFormatError('empty');
    }
    const trimmed = raw.trim();
    if (trimmed.length < TokenValueVO.MIN_LENGTH) {
      throw new InvalidTokenFormatError(`too short (min ${TokenValueVO.MIN_LENGTH})`);
    }
    if (trimmed.length > TokenValueVO.MAX_LENGTH) {
      throw new InvalidTokenFormatError(`too long (max ${TokenValueVO.MAX_LENGTH})`);
    }
    return new TokenValueVO(trimmed);
  }

  static reconstitute(raw: string): TokenValueVO {
    return new TokenValueVO(raw);
  }

  get isJwt(): boolean {
    return this.value.split('.').length === 3;
  }

  // for security, mask in logs
  get masked(): string {
    if (this.value.length <= 8) return '***';
    return `${this.value.slice(0, 4)}...${this.value.slice(-4)}`;
  }
}
