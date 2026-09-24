import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class PreferenceValueVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceValueVO {
    BaseCodeVO.validateNonEmpty(raw, 'PreferenceValue');
    return new PreferenceValueVO(raw);
  }

  static fromBoolean(value: boolean): PreferenceValueVO {
    return new PreferenceValueVO(value ? 'true' : 'false');
  }

  toBoolean(): boolean {
    return this.value === 'true';
  }
}
