import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidWarrantyTypeError } from '../../errors/vendor.errors';

const VALID = new Set<string>([
  'no_warranty',
  'manufacturer',
  'seller',
  'extended',
]);

export class WarrantyTypeVO extends BaseTypeVO {
  static create(value: string): WarrantyTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidWarrantyTypeError(value);
    }
    return new WarrantyTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
