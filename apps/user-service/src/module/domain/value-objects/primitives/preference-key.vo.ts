import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidPreferenceKeyError } from '../../errors/preference.errors';

export class PreferenceKeyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceKeyVO {
    const trimmed = raw.trim();
    if (!/^[a-z][a-z0-9_.]{0,63}$/.test(trimmed)) {
      throw new InvalidPreferenceKeyError(raw);
    }
    return new PreferenceKeyVO(trimmed);
  }
}
