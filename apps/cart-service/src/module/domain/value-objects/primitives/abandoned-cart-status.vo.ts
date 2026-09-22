import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ABANDONED_CART_STATUS } from '@vubon/shared-constants/cart';

const VALID = new Set<string>(Object.values(ABANDONED_CART_STATUS));

export class AbandonedCartStatusVO extends BaseStatusVO<string> {
  static create(value: string): AbandonedCartStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid abandoned cart status: ${value}`);
    }
    return new AbandonedCartStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
