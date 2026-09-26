import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidPreferenceIdError } from '../../errors/preference.errors';

export class PreferenceIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidPreferenceIdError('PreferenceId cannot be empty');
    }
    return new PreferenceIdVO(raw);
  }
}
