/**
 * PreferenceValue Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type PreferencePrimitive = boolean | string | number;

export interface PreferenceValueData {
  readonly primitive: PreferencePrimitive;
}

export class PreferenceValueVO extends BaseVO<PreferenceValueData> {
  private constructor(data: PreferenceValueData) {
    super(data);
  }

  static boolean(value: boolean): PreferenceValueVO {
    if (typeof value !== 'boolean') {
      throw new ValidationError('PreferenceValue must be boolean', 'preferenceValue');
    }
    return new PreferenceValueVO({ primitive: value });
  }

  static string(value: string): PreferenceValueVO {
    if (typeof value !== 'string') {
      throw new ValidationError('PreferenceValue must be string', 'preferenceValue');
    }
    return new PreferenceValueVO({ primitive: value });
  }

  static number(value: number): PreferenceValueVO {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new ValidationError('PreferenceValue must be number', 'preferenceValue');
    }
    return new PreferenceValueVO({ primitive: value });
  }

  static reconstitute(data: PreferenceValueData): PreferenceValueVO {
    return new PreferenceValueVO(data);
  }

  get primitive(): PreferencePrimitive { return this.value.primitive; }
  get isBoolean(): boolean { return typeof this.value.primitive === 'boolean'; }
  get isString(): boolean { return typeof this.value.primitive === 'string'; }
  get isNumber(): boolean { return typeof this.value.primitive === 'number'; }
  get asBoolean(): boolean { return Boolean(this.value.primitive); }
}
