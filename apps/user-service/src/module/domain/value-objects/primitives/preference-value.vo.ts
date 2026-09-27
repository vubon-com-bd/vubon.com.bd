/**
 * PreferenceValue Value Object
 * Supports boolean, string, and number values (serialized).
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class PreferenceValueVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 1000;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceValueVO {
    if (typeof raw !== 'string') {
      throw new Error('Preference value must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length > PreferenceValueVO.MAX_LENGTH) {
      throw new Error(`Preference value too long (max ${PreferenceValueVO.MAX_LENGTH})`);
    }
    return new PreferenceValueVO(trimmed);
  }

  static fromBoolean(value: boolean): PreferenceValueVO {
    return new PreferenceValueVO(value ? 'true' : 'false');
  }

  toBoolean(): boolean {
    return this.value === 'true' || this.value === '1';
  }

  toNumber(): number {
    const n = Number(this.value);
    if (Number.isNaN(n)) {
      throw new Error(`Preference value is not a number: ${this.value}`);
    }
    return n;
  }

  isBoolean(): boolean {
    return this.value === 'true' || this.value === 'false';
  }

  isNumeric(): boolean {
    return this.value.length > 0 && !Number.isNaN(Number(this.value));
  }
}
