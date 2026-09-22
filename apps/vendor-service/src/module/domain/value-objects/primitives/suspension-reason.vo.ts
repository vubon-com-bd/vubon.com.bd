import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { VENDOR_SUSPENSION_REASON } from '@vubon/shared-constants/business/vendor';
import { InvalidSuspensionReasonError } from '../../errors/suspension.errors';

const VALID = new Set<string>(Object.values(VENDOR_SUSPENSION_REASON));

export class SuspensionReasonVO extends BaseCodeVO {
  static create(value: string): SuspensionReasonVO {
    if (!VALID.has(value)) {
      throw new InvalidSuspensionReasonError(value);
    }
    return new SuspensionReasonVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
