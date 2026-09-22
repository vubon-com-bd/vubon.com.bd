import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidSettingIdError } from '../../errors/settings.errors';

export class SettingIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidSettingIdError('SettingId cannot be empty');
    }
    return new SettingIdVO(raw);
  }
}
