import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class RouteNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RouteNameVO {
    BaseNameVO.validate(raw);
    return new RouteNameVO(BaseNameVO.normalize(raw));
  }
}
