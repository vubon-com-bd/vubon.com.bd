/**
 * Name Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { VALIDATION } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export class NameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): NameVO {
    if (typeof raw !== 'string') {
      throw new Error('Name must be a string');
    }
    const trimmed = raw.trim().replace(/\s+/g, ' ');

    if (trimmed.length < VALIDATION.NAME_MIN_LENGTH) {
      throw new Error(`Name too short (min ${VALIDATION.NAME_MIN_LENGTH})`);
    }
    if (trimmed.length > VALIDATION.NAME_MAX_LENGTH) {
      throw new Error(`Name too long (max ${VALIDATION.NAME_MAX_LENGTH})`);
    }
    if (!/^[\p{L}\s'.-]+$/u.test(trimmed)) {
      throw new Error('Name contains invalid characters');
    }

    return new NameVO(trimmed);
  }

  get initials(): string {
    return this.value
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
