import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class WarehouseCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WarehouseCodeVO {
    BaseCodeVO.validateNonEmpty(raw, 'WarehouseCode');
    if (!/^[A-Z0-9-]{2,20}$/.test(raw)) {
      throw new Error(`Invalid warehouse code: ${raw}`);
    }
    return new WarehouseCodeVO(raw);
  }
}
