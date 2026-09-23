import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class DriverNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DriverNameVO {
    BaseNameVO.validate(raw);
    return new DriverNameVO(BaseNameVO.normalize(raw));
  }
}
