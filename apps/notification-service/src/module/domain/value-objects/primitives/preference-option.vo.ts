import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class PreferenceOptionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceOptionVO {
    BaseCodeVO.validateNonEmpty(raw, 'PreferenceOption');
    return new PreferenceOptionVO(raw);
  }
}
