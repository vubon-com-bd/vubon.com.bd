import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class VectorNameVO extends BaseCodeVO {
  static create(raw: string): VectorNameVO {
    BaseCodeVO.validateNonEmpty(raw, 'VectorName');
    if (!/^[a-z0-9_-]+$/.test(raw)) {
      throw new Error(
        `VectorName must be lowercase alphanumeric with - or _: ${raw}`,
      );
    }
    return new VectorNameVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
