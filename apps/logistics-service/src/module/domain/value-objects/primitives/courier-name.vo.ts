import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class CourierNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CourierNameVO {
    BaseNameVO.validate(raw);
    return new CourierNameVO(BaseNameVO.normalize(raw));
  }
}
