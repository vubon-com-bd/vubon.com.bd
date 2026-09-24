import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class ProviderNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProviderNameVO {
    BaseNameVO.validate(raw);
    return new ProviderNameVO(BaseNameVO.normalize(raw));
  }
}
