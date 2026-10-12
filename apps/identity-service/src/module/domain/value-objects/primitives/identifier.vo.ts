/**
 * Identifier Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Supports: email OR phone. Normalizes to lowercase (email) / digits (phone).
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type IdentifierKind = 'email' | 'phone' | 'username';

export interface IdentifierValue {
  readonly kind: IdentifierKind;
  readonly raw: string;
  readonly normalized: string;
}

export class IdentifierVO extends BaseVO<IdentifierValue> {
  private constructor(value: IdentifierValue) {
    super(value);
  }

  static email(raw: string): IdentifierVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Email identifier cannot be empty', 'identifier');
    }
    const normalized = raw.trim().toLowerCase();
    if (!REGEX.EMAIL.test(normalized)) {
      throw new ValidationError('Invalid email identifier', 'identifier');
    }
    return new IdentifierVO({ kind: 'email', raw, normalized });
  }

  static phone(raw: string): IdentifierVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Phone identifier cannot be empty', 'identifier');
    }
    const digits = raw.trim().replace(/[\s-]/g, '');
    if (!REGEX.PHONE_BD.test(digits) && !REGEX.PHONE_INTL.test(digits)) {
      throw new ValidationError('Invalid phone identifier', 'identifier');
    }
    return new IdentifierVO({ kind: 'phone', raw, normalized: digits });
  }

  static username(raw: string): IdentifierVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Username identifier cannot be empty', 'identifier');
    }
    const normalized = raw.trim().toLowerCase();
    if (!REGEX.USERNAME.test(normalized)) {
      throw new ValidationError('Invalid username identifier', 'identifier');
    }
    return new IdentifierVO({ kind: 'username', raw, normalized });
  }

  static auto(raw: string): IdentifierVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Identifier cannot be empty', 'identifier');
    }
    const trimmed = raw.trim();
    if (REGEX.EMAIL.test(trimmed)) return IdentifierVO.email(trimmed);
    if (REGEX.PHONE_BD.test(trimmed) || REGEX.PHONE_INTL.test(trimmed)) {
      return IdentifierVO.phone(trimmed);
    }
    return IdentifierVO.username(trimmed);
  }

  static reconstitute(value: IdentifierValue): IdentifierVO {
    return new IdentifierVO(value);
  }

  get kind(): IdentifierKind { return this.value.kind; }
  get raw(): string { return this.value.raw; }
  get normalized(): string { return this.value.normalized; }

  isEmail(): boolean { return this.value.kind === 'email'; }
  isPhone(): boolean { return this.value.kind === 'phone'; }
  isUsername(): boolean { return this.value.kind === 'username'; }
}
