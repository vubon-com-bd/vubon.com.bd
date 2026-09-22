import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { CART_TYPE } from '@vubon/shared-constants/cart';

const VALID = new Set<string>(Object.values(CART_TYPE));

export class CartTypeVO extends BaseTypeVO<string> {
  static create(value: string): CartTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid cart type: ${value}`);
    }
    return new CartTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
