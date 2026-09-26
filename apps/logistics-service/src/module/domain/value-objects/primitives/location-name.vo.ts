import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class LocationNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LocationNameVO {
    BaseNameVO.validate(raw);
    return new LocationNameVO(BaseNameVO.normalize(raw));
  }
}
