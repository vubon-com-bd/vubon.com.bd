import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidPreferenceValueError } from '../../errors/preference.errors';

export class PreferenceValueVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceValueVO {
    if (raw.length > 500) {
      throw new InvalidPreferenceValueError('must not exceed 500 characters');
    }
    return new PreferenceValueVO(raw);
  }
}
