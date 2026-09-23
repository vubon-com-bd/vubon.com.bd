import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class InsuranceProviderVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InsuranceProviderVO {
    BaseNameVO.validate(raw);
    return new InsuranceProviderVO(BaseNameVO.normalize(raw));
  }
}
