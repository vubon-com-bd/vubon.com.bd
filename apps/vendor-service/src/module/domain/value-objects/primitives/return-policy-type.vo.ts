import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_RETURN_TYPE } from '@vubon/shared-constants/business/vendor';
import { InvalidReturnPolicyTypeError } from '../../errors/vendor.errors';

const VALID = new Set<string>(Object.values(VENDOR_RETURN_TYPE));

export class ReturnPolicyTypeVO extends BaseTypeVO {
  static create(value: string): ReturnPolicyTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidReturnPolicyTypeError(value);
    }
    return new ReturnPolicyTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
