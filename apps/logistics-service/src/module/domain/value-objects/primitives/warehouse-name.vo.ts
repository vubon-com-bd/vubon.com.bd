import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class WarehouseNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WarehouseNameVO {
    BaseNameVO.validate(raw);
    return new WarehouseNameVO(BaseNameVO.normalize(raw));
  }
}
