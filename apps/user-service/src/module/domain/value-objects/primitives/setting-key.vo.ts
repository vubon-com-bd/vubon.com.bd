import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidSettingKeyError } from '../../errors/settings.errors';

export class SettingKeyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingKeyVO {
    const trimmed = raw.trim();
    if (!/^[a-z][a-z0-9_.]{0,63}$/.test(trimmed)) {
      throw new InvalidSettingKeyError(raw);
    }
    return new SettingKeyVO(trimmed);
  }
}
