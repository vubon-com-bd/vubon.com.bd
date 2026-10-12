/**
 * PasswordHash Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * ⚠️ শুধু hash store করে, plaintext নয়।
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { PasswordHashInvalidError } from '../../errors/credential.errors.js';

export class PasswordHashVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PasswordHashVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new PasswordHashInvalidError('empty');
    }
    const trimmed = raw.trim();
    // bcrypt format: $2a$/$2b$/$2y$ + cost + salt+hash (60 chars total)
    if (!/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(trimmed)) {
      throw new PasswordHashInvalidError('not a valid bcrypt hash');
    }
    return new PasswordHashVO(trimmed);
  }

  static reconstitute(raw: string): PasswordHashVO {
    return new PasswordHashVO(raw);
  }

  get algorithm(): 'bcrypt' {
    return 'bcrypt';
  }

  get cost(): number {
    return parseInt(this.value.slice(4, 6), 10);
  }
}
