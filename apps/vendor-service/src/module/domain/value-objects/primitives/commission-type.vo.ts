import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_COMMISSION_TYPE } from '@vubon/shared-constants/business/vendor';
import { InvalidCommissionTypeError } from '../../errors/commission.errors';

const VALID = new Set<string>(Object.values(VENDOR_COMMISSION_TYPE));

export class CommissionTypeVO extends BaseTypeVO {
  static create(value: string): CommissionTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidCommissionTypeError(value);
    }
    return new CommissionTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
