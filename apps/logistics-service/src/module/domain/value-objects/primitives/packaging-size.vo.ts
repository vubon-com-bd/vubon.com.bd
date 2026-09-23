import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class PackagingSizeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PackagingSizeVO {
    BaseCodeVO.validateNonEmpty(raw, 'PackagingSize');
    return new PackagingSizeVO(raw);
  }
}
