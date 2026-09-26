import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class ZoneNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ZoneNameVO {
    BaseNameVO.validate(raw);
    return new ZoneNameVO(BaseNameVO.normalize(raw));
  }
}
