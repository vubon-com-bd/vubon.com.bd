import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VENDOR_SUSPENSION_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidSuspensionStatusError } from '../../errors/suspension.errors';

const VALID = new Set<string>(Object.values(VENDOR_SUSPENSION_STATUS));

export class SuspensionStatusVO extends BaseVO<string> {
  static create(value: string): SuspensionStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidSuspensionStatusError(value);
    }
    return new SuspensionStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }

  isActive(): boolean {
    return this.value === VENDOR_SUSPENSION_STATUS.ACTIVE;
  }
}
