/**
 * TeamInviteToken Value Object — secure random token (16-255 chars)
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 16;
const MAX_LENGTH = 255;
const PATTERN = /^[A-Za-z0-9_\-]+$/;

export class TeamInviteTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TeamInviteTokenVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Invite token must be a string', 'token');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `Invite token must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'token',
      );
    }
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        'Invite token may contain only A-Z, a-z, 0-9, _, -',
        'token',
      );
    }
    return new TeamInviteTokenVO(trimmed);
  }

  static reconstitute(raw: string): TeamInviteTokenVO {
    return new TeamInviteTokenVO(raw);
  }

  /** Tokens must be at least 16 chars for security. */
  isSecure(): boolean {
    return this.value.length >= 32;
  }

  /** Return only the prefix — never log the full token. */
  masked(): string {
    return `${this.value.slice(0, 4)}${'*'.repeat(Math.max(0, this.value.length - 4))}`;
  }
}
