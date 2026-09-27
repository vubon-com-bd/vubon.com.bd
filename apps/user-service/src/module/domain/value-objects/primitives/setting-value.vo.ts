/**
 * SettingValue Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SettingValueVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 2000;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingValueVO {
    if (typeof raw !== 'string') {
      throw new Error('Setting value must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length > SettingValueVO.MAX_LENGTH) {
      throw new Error(`Setting value too long (max ${SettingValueVO.MAX_LENGTH})`);
    }
    return new SettingValueVO(trimmed);
  }

  static fromBoolean(value: boolean): SettingValueVO {
    return new SettingValueVO(value ? 'true' : 'false');
  }

  toBoolean(): boolean {
    return this.value === 'true' || this.value === '1';
  }

  isBoolean(): boolean {
    return this.value === 'true' || this.value === 'false';
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }
}
