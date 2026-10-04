/**
 * SettingId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SettingIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('SettingId cannot be empty');
    }
    return new SettingIdVO(raw.trim());
  }
}
