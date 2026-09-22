import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { CART_STATUS } from '@vubon/shared-constants/cart';

const VALID = new Set<string>(Object.values(CART_STATUS));

export class CartStatusVO extends BaseStatusVO<string> {
  static create(value: string): CartStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid cart status: ${value}`);
    }
    return new CartStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
