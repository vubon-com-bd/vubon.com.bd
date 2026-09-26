import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidFeatureTypeError } from '../../errors/vendor.errors';

const VALID = new Set<string>([
  'analytics',
  'custom_domain',
  'priority_support',
  'api_access',
  'bulk_upload',
  'advanced_shipping',
]);

export class FeatureTypeVO extends BaseTypeVO {
  static create(value: string): FeatureTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidFeatureTypeError(value);
    }
    return new FeatureTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
