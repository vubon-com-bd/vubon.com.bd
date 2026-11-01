/**
 * SettingValue Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type SettingPrimitive = boolean | string | number;

export interface SettingValueData {
  readonly primitive: SettingPrimitive;
}

export class SettingValueVO extends BaseVO<SettingValueData> {
  private constructor(data: SettingValueData) {
    super(data);
  }

  static create(data: { primitive: SettingPrimitive }): SettingValueVO {
    const v = data.primitive;
    if (
      typeof v !== 'boolean' &&
      typeof v !== 'string' &&
      typeof v !== 'number'
    ) {
      throw new ValidationError('SettingValue must be boolean/string/number', 'settingValue');
    }
    if (typeof v === 'number' && !Number.isFinite(v)) {
      throw new ValidationError('SettingValue number must be finite', 'settingValue');
    }
    if (typeof v === 'string' && v.length > 1000) {
      throw new ValidationError('SettingValue string exceeds 1000 chars', 'settingValue');
    }
    return new SettingValueVO(data);
  }

  static reconstitute(data: SettingValueData): SettingValueVO {
    return new SettingValueVO(data);
  }

  get primitive(): SettingPrimitive { return this.value.primitive; }
  get isBoolean(): boolean { return typeof this.value.primitive === 'boolean'; }
  get isString(): boolean { return typeof this.value.primitive === 'string'; }
  get isNumber(): boolean { return typeof this.value.primitive === 'number'; }
}
