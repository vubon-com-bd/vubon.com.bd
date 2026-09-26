import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidBusinessTypeError } from '../../errors/vendor.errors';

const VALID = new Set<string>([
  'sole_proprietorship',
  'partnership',
  'limited_liability',
  'corporation',
  'other',
]);

export class BusinessTypeVO extends BaseTypeVO {
  static create(value: string): BusinessTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidBusinessTypeError(value);
    }
    return new BusinessTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
