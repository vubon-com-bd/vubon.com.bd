import { VALIDATION } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export abstract class BaseNameVO extends BaseVO<string> {
  protected constructor(value: string) {
    super(value);
  }

  protected static normalize(raw: string): string {
    return raw.trim().replace(/\s+/g, ' ');
  }

  protected static validate(raw: string): void {
    const trimmed = raw.trim().replace(/\s+/g, ' ');
    if (typeof raw !== 'string') {
      throw new Error('Name must be a string');
    }
    if (trimmed.length < VALIDATION.NAME_MIN_LENGTH) {
      throw new Error(`Name too short (min ${VALIDATION.NAME_MIN_LENGTH})`);
    }
    if (trimmed.length > VALIDATION.NAME_MAX_LENGTH) {
      throw new Error(`Name too long (max ${VALIDATION.NAME_MAX_LENGTH})`);
    }
    if (!/^[\p{L}\s'.-]+$/u.test(trimmed)) {
      throw new Error('Name contains invalid characters');
    }
  }

  get initials(): string {
    return this.value
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}

export class NameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): NameVO {
    BaseNameVO.validate(raw);
    return new NameVO(BaseNameVO.normalize(raw));
  }
}
