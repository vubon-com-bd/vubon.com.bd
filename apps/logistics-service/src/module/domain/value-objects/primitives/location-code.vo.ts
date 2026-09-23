import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class LocationCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LocationCodeVO {
    BaseCodeVO.validateNonEmpty(raw, 'LocationCode');
    return new LocationCodeVO(raw);
  }
}
