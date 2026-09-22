import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidProfileVisibilityError } from '../../errors/profile.errors';

const VALID = new Set(['public', 'private', 'friends']);

export class ProfileVisibilityVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProfileVisibilityVO {
    if (!VALID.has(raw)) {
      throw new InvalidProfileVisibilityError(raw);
    }
    return new ProfileVisibilityVO(raw);
  }

  isPublic(): boolean {
    return this.value === 'public';
  }

  isPrivate(): boolean {
    return this.value === 'private';
  }
}
