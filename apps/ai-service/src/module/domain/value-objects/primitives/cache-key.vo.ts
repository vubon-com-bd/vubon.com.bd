import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class CacheKeyVO extends BaseCodeVO {
  static create(raw: string): CacheKeyVO {
    BaseCodeVO.validateNonEmpty(raw, 'CacheKey');
    if (raw.length > 512) {
      throw new Error('CacheKey too long');
    }
    return new CacheKeyVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
