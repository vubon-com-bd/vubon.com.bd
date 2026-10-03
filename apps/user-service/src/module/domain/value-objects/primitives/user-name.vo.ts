/**
 * UserName Value Object
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class UserNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserNameVO {
    if (typeof raw !== 'string') {
      throw new Error('Name must be a string');
    }
    UserNameVO.validate(raw);
    return new UserNameVO(UserNameVO.normalize(raw));
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  hasMiddleName(): boolean {
    return this.wordCount >= 3;
  }

  getFirstName(): string {
    return this.value.split(' ')[0] ?? '';
  }

  getLastName(): string {
    const parts = this.value.split(' ').filter(Boolean);
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  isSingleWord(): boolean {
    return this.wordCount === 1;
  }
}
