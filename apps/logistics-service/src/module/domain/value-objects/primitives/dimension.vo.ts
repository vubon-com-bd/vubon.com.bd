import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class DimensionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DimensionVO {
    BaseCodeVO.validateNonEmpty(raw, 'Dimension');
    if (!/^\d+(\.\d+)?x\d+(\.\d+)?x\d+(\.\d+)?$/.test(raw)) {
      throw new Error(`Invalid dimension format (LxWxH): ${raw}`);
    }
    return new DimensionVO(raw);
  }
}
