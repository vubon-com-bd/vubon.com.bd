import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidSettingValueError } from '../../errors/settings.errors';

export class SettingValueVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingValueVO {
    if (raw.length > 500) {
      throw new InvalidSettingValueError('must not exceed 500 characters');
    }
    return new SettingValueVO(raw);
  }
}
